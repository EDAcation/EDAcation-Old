import {addDebugLogging} from '../../util';

import {EmscriptenWrapper, WorkerTool} from './tool';

const nodeToPath = (node: FSNode) => {
    if (node.name === '/') {
        return [];
    }
    return [nodeToPath(node.parent)].concat(node.name);
};

// TODO: upstream these types to @types/emscripten

interface FSType {
    // TODO: figure out if these exist on all FS types
    createNode(parent: FSNode | null, name: string, mode: number, dev: number): FSNode;
    mount(mount: FSMount): FSNode;
}

interface FSMount {
    mountpoint: string;
    mounts: FSMount[];
    opts: Record<string | number | symbol, unknown>;
    root: FSNode;
    type: FSType;
}

interface FSNode {
    contents: Record<string | number | symbol, unknown>;
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
}

interface FSNodeFile extends FSNode {
    usedBytes: number;
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
            // mode: S_IFDIR | 777
            return STORAGE_FS.createNode(null, '/', 0o40000 | 511, 0);
        },
        createNode(parent: FSNode | null, name: string, mode: number, dev: number): FSNode {
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
                node.contents = {};
            } else if (FS.isFile(node.mode)) {
                node.node_ops = STORAGE_FS.ops_table.file.node;
                node.stream_ops = STORAGE_FS.ops_table.file.stream;
                node.usedBytes = 0;
                node.contents = null;
            }

            node.timestamp = Date.now();

            if (parent) {
                parent.contents[name] = node;
                parent.timestamp = node.timestamp;
            }

            return node;
        },
        syncfs(mount, populate, callback) {
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
                    size: 0,
                    atime: new Date(node.timestamp),
                    mtime: new Date(node.timestamp),
                    ctime: new Date(node.timestamp),
                    blksize: 4096,
                    blocks: 0
                };

                if (FS.isDir(node.mode)) {
                    attr.size = 4096;
                } else if (FS.isFile(node.mode)) {
                    attr.size = (node as FSNodeFile).usedBytes;
                } else if (FS.isLink(node.mode)) {
                    // attr.size = (node as FSNodeLink).link.length;
                    throw new Error('Storage FS does not support link nodes.');
                } else {
                    attr.size = 0;
                }

                attr.blocks = Math.ceil(attr.size / attr.blksize);

                return attr;
            },
            setattr(node: FSNode, attr) {
                if (attr.mode !== undefined) {
                    node.mode = attr.mode;
                }

                if (attr.timestamp !== undefined) {
                    node.timestamp = attr.timestamp;
                }

                // TODO: remove?
                if (attr.size !== undefined) {
                    // MEMFS.resizeFileStorage(node, attr.size);
                }
            },
            lookup(_parent: FSNode, _name: string): FSLookup {
                // TODO: should this be: return parent.contents[name];
                throw FS.genericErrors[44];
            },
            mknod(parent: FSNode, name: string, mode: number, dev: number): FSNode {
                return STORAGE_FS.createNode(parent, name, mode, dev);
            },
            rename(oldNode: FSNode, newDir, newName: string) {
                throw new Error('Not implemented.');
            },
            unlink(parent: FSNode, name: string) {
                tool.callFs(parent.mount.opts.storageId as string, nodeToPath(parent).concat(name), 'unlink');
                parent.timestamp = Date.now();
            },
            rmdir(parent: FSNode, name: string) {
                const node = parent.contents[name] as FSNode;
                if (!node) {
                    throw new Error('Directory not empty');
                }

                tool.callFs(parent.mount.opts.storageId as string, nodeToPath(node), 'rmdir');

                delete parent.contents[name];
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
            read(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position: number): number {
                throw new Error('Not implemented.');
            },
            write(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position: number, canOwn?: boolean): number {
                throw new Error('Not implemented.');
            },
            llseek(stream: FSStream, offset: number, whence: number) {
                throw new Error('Not implemented.');
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

    return addDebugLogging('StorageFS', STORAGE_FS);
};
