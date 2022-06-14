const debug = (name: string, ...args: unknown[]) => console.log(`[StorageFS.${name}]`, ...args);

export const createStorageFS = (FS) => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const STORAGE_FS: any = {
        ops_table: null,

        mount(mount) {
            debug('mount', mount);

            // mode: S_IFDIR | 777
            const node = STORAGE_FS.createNode(null, '/', 0o40000 | 511, 0);
            node.contents.storage = mount.opts.storage;

            return node;
        },
        createNode(parent, name: string, mode: number, dev: number) {
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
                            llseek: null
                        }
                    },
                    file: {
                        node: {
                            getattr: STORAGE_FS.node_ops.getattr,
                            setattr: STORAGE_FS.node_ops.setattr
                        },
                        stream: {
                            llseek: null,
                            read: null,
                            write: null,
                            allocate: null,
                            mmap: null,
                            msync: null
                        }
                    }
                };
            }

            debug('createNode', parent, name, mode, dev);

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
            debug('syncfs', mount, populate, callback);
        },

        node_ops: {
            getattr(node) {
                debug('getattr', node);

                throw new Error('Not implemented.');
            },
            setattr(node, attr) {
                debug('setattr', node, attr);

                throw new Error('Not implemented.');
            },
            lookup(parent, name) {
                debug('lookup', parent, name);

                throw new Error('Not implemented.');
            },
            mknod(parent, name: string, mode: number, dev: number) {
                debug('mknod', parent, name, mode, dev);

                return STORAGE_FS.createNode(parent, name, mode, dev);
            },
            rename(oldNode, newDir, newName) {
                debug('rename', oldNode, newDir, newName);

                throw new Error('Not implemented.');
            },
            unlink(parent, name) {
                debug('unlink', parent, name);

                throw new Error('Not implemented.');
            },
            rmdir(parent, name) {
                debug('rmdir', parent, name);

                throw new Error('Not implemented.');
            },
            readdir(node) {
                debug('readdir', node);



                throw new Error('Not implemented.');
            },
            symlink(parent, newName, oldPath) {
                debug('symlink', parent, newName, oldPath);

                throw new Error('Not implemented.');
            },
            readlink(node) {
                debug('readlink', node);

                throw new Error('Not implemented.');
            }
        },

        stream_ops: {
            read(stream, buffer, offset, length, position) {
                debug('read', stream, buffer, offset, length, position);

                throw new Error('Not implemented.');
            },
            write(stream, buffer, offset, length, position, canOwn) {
                debug('write', stream, buffer, offset, length, position, canOwn);

                throw new Error('Not implemented.');
            },
            llseek(stream, offset, whence) {
                debug('msync', stream, offset, whence);

                throw new Error('Not implemented.');
            },
            allocate(stream, offset, length) {
                debug('msync', stream, offset, length);

                throw new Error('Not implemented.');
            },
            mmap(stream, length, position, prot, flags) {
                debug('msync', stream, length, position, prot, flags);

                throw new Error('Not implemented.');
            },
            msync(stream, buffer, offset, length, mmapFlags) {
                debug('msync', stream, buffer, offset, length, mmapFlags);

                throw new Error('Not implemented.');
            }
        }
    };

    return STORAGE_FS;
};
