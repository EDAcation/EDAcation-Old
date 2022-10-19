import {StorageEntryType} from '../../storage';
import {debug, addDebugLogging} from '../../util';

import {BLOCK_SIZE} from './constants';
import {EmscriptenWrapper, WorkerTool} from './tool';

const ENOENT = 2;
const EINVAL = 22;

const S_IFDIR = 0o40000;
const S_IFREG = 0o100000;
const S_IRWXU = 0o700;
const S_IRWXG = 0o070;
const S_IRWXO = 0o007;
const S_IRWX = S_IRWXU | S_IRWXG | S_IRWXO;

const SEEK_CUR = 1;
const SEEK_END = 2;

const nodeToPath = (node: FSNode) => {
    if (node.name === '/') {
        return [];
    }
    return nodeToPath(node.parent).concat(node.name);
};

// TODO: upstream these types to @types/emscripten

type FSType = unknown;

interface FSMount {
    mountpoint: string;
    mounts: FSMount[];
    opts: Record<string | number | symbol, unknown>;
    root: FSNode;
    type: FSType;
}

interface FSNode {
    contents: unknown;
    id: number;
    mode: number;
    mount: FSMount;
    mounted?: unknown;
    name: string;
    name_next?: unknown;
    node_ops: unknown;
    parent: FSNode;
    rdev: number;
    stream_ops: unknown;
    timestamp: number;
    // NOTE: specific to Storage FS
    lastSize?: number;
}

interface FSStream {
    error: boolean;
    fd: number;
    flags: number;
    node: FSNode;
    path: string;
    position: number;
    seekable: boolean;
    shared: Record<string | number | symbol, unknown>;
    streams_ops: unknown;
    ungotten: unknown[];
}

interface FSLookup {
    path: string;
    node: FSNode;
}

export const createStorageFS = (FS, tool: WorkerTool<EmscriptenWrapper>) => {
    // Storage FS is based on MEMFS from the Emscripten standard library

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const STORAGE_FS: any = {
        ops_table: null,

        mount(_mount: FSMount): FSNode {
            return STORAGE_FS.createNode(null, '/', S_IFDIR | S_IRWX, 0);
        },
        createNode(parent: FSNode | null, name: string, mode: number, dev: number, size?: number): FSNode {
            if (!STORAGE_FS.ops_table) {
                STORAGE_FS.ops_table = {
                    dir: {
                        node: {
                            getattr: STORAGE_FS.node_ops.getattr,
                            setattr: STORAGE_FS.node_ops.setattr,
                            lookup: STORAGE_FS.node_ops.lookup,
                            mknod: STORAGE_FS.node_ops.mknod,
                            rename: STORAGE_FS.node_ops.rename,
                            unlink: STORAGE_FS.node_ops.unlink,
                            rmdir: STORAGE_FS.node_ops.rmdir,
                            readdir: STORAGE_FS.node_ops.readdir,
                            symlink: STORAGE_FS.node_ops.symlink
                        },
                        stream: {
                            llseek: STORAGE_FS.stream_ops.llseek
                        }
                    },
                    file: {
                        node: {
                            getattr: STORAGE_FS.node_ops.getattr,
                            setattr: STORAGE_FS.node_ops.setattr
                        },
                        stream: {
                            llseek: STORAGE_FS.stream_ops.llseek,
                            read: STORAGE_FS.stream_ops.read,
                            write: STORAGE_FS.stream_ops.write,
                            allocate: STORAGE_FS.stream_ops.allocate,
                            mmap: STORAGE_FS.stream_ops.mmap,
                            msync: STORAGE_FS.stream_ops.msync
                        }
                    }
                };
            }

            if (FS.isBlkdev(mode)) {
                throw new Error('Storage FS does not support blkdev nodes.');
            } else if (FS.isFIFO(mode)) {
                throw new Error('Storage FS does not support fifo nodes.');
            } else if (FS.isLink(mode)) {
                throw new Error('Storage FS does not support link nodes.');
            } else if (FS.isChrdev(mode)) {
                throw new Error('Storage FS does not support chrdev nodes.');
            }

            const node = FS.createNode(parent, name, mode, dev);

            if (FS.isDir(node.mode)) {
                node.node_ops = STORAGE_FS.ops_table.dir.node;
                node.stream_ops = STORAGE_FS.ops_table.dir.stream;
                node.lastSize = size || 4096;
            } else if (FS.isFile(node.mode)) {
                node.node_ops = STORAGE_FS.ops_table.file.node;
                node.stream_ops = STORAGE_FS.ops_table.file.stream;
                node.lastSize = size || 0;
            }

            node.timestamp = Date.now();

            if (parent) {
                parent.timestamp = node.timestamp;
            }

            return node;
        },
        syncfs(_mount, _populate, _callback) {
            throw new Error('Not implemented.');
        },

        node_ops: {
            getattr(node: FSNode) {
                const attr = {
                    ino: node.id,
                    mode: node.mode,
                    nlink: 1,
                    uid: 0,
                    gid: 0,
                    rdev: node.rdev,
                    atime: new Date(node.timestamp),
                    mtime: new Date(node.timestamp),
                    ctime: new Date(node.timestamp),
                    size: node.lastSize || 0,
                    blksize: BLOCK_SIZE,
                    blocks: 0
                };

                attr.blocks = Math.ceil(attr.size / attr.blksize);

                return attr;
            },
            setattr(node: FSNode, attr: Record<string, unknown>) {
                // if (attr.mode !== undefined) {
                //     node.mode = attr.mode;
                // }

                if (attr.timestamp !== undefined) {
                    node.timestamp = attr.timestamp as number;
                }

                if (attr.size !== undefined) {
                    tool.callFs(node.mount.opts.storageId as string, nodeToPath(node), 'truncate', {
                        size: attr.size as number
                    });
                }
            },
            lookup(parent: FSNode, name: string): FSLookup {
                const [type, size] = tool.callFs(parent.mount.opts.storageId as string, nodeToPath(parent).concat(name), 'stat');

                if (type === 0) {
                    throw new FS.ErrnoError(ENOENT);
                }

                let mode = S_IRWX;
                if (type === 1) {
                    mode |= S_IFDIR;
                } else if (type === 2) {
                    mode |= S_IFREG;
                }

                return STORAGE_FS.createNode(parent, name, mode, 0, size);
            },
            mknod(parent: FSNode, name: string, mode: number, dev: number): FSNode {
                if (!FS.isDir(mode) && !FS.isFile(mode)) {
                    throw new Error('Storage FS does not support nodes other than dir and file.');
                }

                tool.callFs(parent.mount.opts.storageId as string, nodeToPath(parent), 'mknod', {
                    name,
                    mode: FS.isDir(mode) ? StorageEntryType.DIRECTORY : StorageEntryType.FILE
                });
                return STORAGE_FS.createNode(parent, name, mode, dev);
            },
            rename(_oldNode: FSNode, _newDir, _newName: string) {
                throw new Error('Not implemented.');
            },
            unlink(parent: FSNode, name: string) {
                tool.callFs(parent.mount.opts.storageId as string, nodeToPath(parent).concat(name), 'unlink');
                parent.timestamp = Date.now();
            },
            rmdir(parent: FSNode, name: string) {
                tool.callFs(parent.mount.opts.storageId as string, nodeToPath(parent).concat(name), 'rmdir');
                parent.timestamp = Date.now();
            },
            readdir(node: FSNode) {
                return ['.', '..'].concat(tool.callFs(node.mount.opts.storageId as string, nodeToPath(node), 'readdir'));
            },
            symlink(_parent: FSNode, _newName: string, _oldPath: unknown) {
                throw new Error('Storage FS does not support link nodes.');
            },
            readlink(_node: FSNode) {
                throw new Error('Storage FS does not support link nodes.');
            }
        },

        stream_ops: {
            read(stream: FSStream, buffer: Uint8Array, offset: number, length: number, position: number): number {
                const data = tool.callFs(stream.node.mount.opts.storageId as string, nodeToPath(stream.node), 'read', {
                    start: position,
                    end: position + length
                });

                buffer.set(data, offset);

                return data.length;
            },
            write(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position: number): number {
                if (length === 0) {
                    return length;
                }

                tool.callFs(stream.node.mount.opts.storageId as string, nodeToPath(stream.node), 'write', {
                    buffer: buffer.buffer.slice(offset, offset + length),
                    start: position,
                    end: position + length
                });

                return length;
            },
            llseek(stream: FSStream, offset: number, whence: number) {
                let position = offset;
                if (whence === SEEK_CUR) {
                    position += stream.position;
                } else if (whence === SEEK_END) {
                    if (FS.isFile(stream.node.mode)) {
                        position += stream.node.lastSize || 0;
                    }
                }
                if (position < 0) {
                    throw new FS.ErrnoError(EINVAL);
                }
                return position;
            },
            allocate(stream: FSStream, offset: number, length: number) {
                throw new Error('Not implemented.');
            },
            mmap(stream: FSStream, length: number, position: number, prot: number, flags: number) {
                throw new Error('Not implemented.');
            },
            msync(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, mmapFlags: number) {
                throw new Error('Not implemented.');
            }
        }
    };

    return addDebugLogging('fs', 'StorageFS', STORAGE_FS);
};
