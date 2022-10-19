import {deserializeState} from '../serializable';
import {SerializedStorage, Storage, StorageDirectory, StorageEntryType, StorageFile} from '../storage';
import {debug} from '../util';

import {INDEX_DATA, INDEX_FS_LOCK, INDEX_WORKER_LOCK, INDEX_WORKER_NOTIFY, Operation} from './common/constants';
import {Data} from './common/data';
import {Mutex} from './common/mutex';

interface MessageInit {
    type: 'init';
    sharedBuffer: SharedArrayBuffer;
}

interface MessageWorker {
    type: 'worker';
    port: MessagePort;
}

interface MessageStorage {
    type: 'storage';
    storage: SerializedStorage;
}

interface MessageCall {
    type: 'call';
    jobId: number;
    storageId: string;
    path: string[];
    operation: Operation;
    [key: string]: unknown;
}

type Message = MessageInit | MessageWorker | MessageStorage | MessageCall;

interface State {
    sharedBuffer: SharedArrayBuffer;
    arrayUint8: Uint8Array;
    arrayInt32: Int32Array;
    lockFs: Mutex;
    lockWorker: Mutex;
    data: Data;
    ports: MessagePort[];

    storages: Record<string, Storage<unknown, unknown>>;
}

let state: State;

const handleMessage = async (event: MessageEvent<Message>) => {
    debug('fs', event);

    switch (event.data.type) {
        case 'init': {
            const {sharedBuffer} = event.data;

            const arrayUint8 = new Uint8Array(sharedBuffer);
            const arrayInt32 = new Int32Array(sharedBuffer);

            state = {
                sharedBuffer,
                arrayUint8,
                arrayInt32,
                lockFs: new Mutex(arrayInt32, INDEX_FS_LOCK),
                lockWorker: new Mutex(arrayInt32, INDEX_WORKER_LOCK),
                data: new Data(sharedBuffer, INDEX_DATA * 4),
                ports: [],

                storages: {}
            };

            break;
        }
        case 'worker': {
            const {port} = event.data;

            port.addEventListener('message', handleMessage);
            port.addEventListener('messageerror', handleMessageError);
            port.start();
            state.ports.push(port);

            break;
        }
        case 'storage': {
            const storage = deserializeState<Storage<unknown, unknown>>(event.data.storage);

            state.storages[storage.getID()] = storage;

            break;
        }
        case 'call': {
            const {storageId, path, operation, ...args} = event.data;

            debug('fs', 'FS received request', storageId, path, operation);

            const storage = state.storages[storageId];
            if (!storage) {
                console.error(`Unknown storage ID "${storageId}"`);
                break;
            }

            let entry = await storage.getEntry(path, true);

            debug('fs', 'FS is waiting for FS lock...');

            // Acquire FS lock
            state.lockFs.acquire();

            debug('fs', 'FS has FS lock');

            // Perform operation
            try {
                // Write success response to data buffer (overriden in case of an error)
                state.data.resetOffset();
                state.data.writeUint8(0);

                switch (operation) {
                    case 'readdir': {
                        if (!(entry instanceof StorageDirectory)) {
                            throw new Error('Storage entry is not a directory.');
                        }

                        // Read directory
                        const entries = await entry.getEntries(true);

                        // Write response to data buffer
                        state.data.writeStringArray(entries.map((entry) => entry.getName()));

                        break;
                    }
                    case 'mknod': {
                        if (!(entry instanceof StorageDirectory)) {
                            throw new Error('Storage entry is not a directory.');
                        }

                        // Create entry
                        switch (args.mode as StorageEntryType) {
                            case StorageEntryType.DIRECTORY: {
                                await entry.createDirectory(args.name as string);
                                break;
                            }
                            case StorageEntryType.FILE: {
                                await entry.createFile(args.name as string);
                                break;
                            }
                        }

                        break;
                    }
                    case 'rmdir': {
                        if (!(entry instanceof StorageDirectory)) {
                            throw new Error('Storage entry is not a directory.');
                        }

                        // Delete directory
                        await entry.delete(true);

                        break;
                    }
                    case 'unlink': {
                        if (!(entry instanceof StorageFile)) {
                            throw new Error('Storage entry is not a file.');
                        }

                        // Delete file
                        await entry.delete();

                        break;
                    }
                    case 'stat': {
                        // Get file type
                        let type = 0;
                        if (entry instanceof StorageDirectory) {
                            type = 1;
                        } else if (entry instanceof StorageFile) {
                            type = 2;
                        }

                        // Get file size
                        const size = entry ? await entry.getSize() : 0;

                        // Write response to data buffer
                        state.data.writeUint8(type);
                        state.data.writeUint32(size);

                        break;
                    }
                    case 'read': {
                        if (!(entry instanceof StorageFile)) {
                            throw new Error('Storage entry is not a file.');
                        }

                        // Read from file
                        const result = await entry.read(args.start as number, args.end as number);
                        const resultArray = new Uint8Array(result);

                        // Write response to data buffer
                        state.data.writeUint8Array(resultArray);

                        break;
                    }
                    case 'truncate': {
                        if (!entry) {
                            const directory = await storage.getEntry(path.slice(0, path.length - 1));
                            if (!(directory instanceof StorageDirectory)) {
                                throw new Error('Parent of storage entry is not a directory.');
                            }
                            entry = await directory.createFile(path[path.length - 1]);
                        }

                        if (!(entry instanceof StorageFile)) {
                            throw new Error('Storage entry is not a file.');
                        }

                        // Truncate file
                        await entry.truncate(args.size as number);

                        break;
                    }
                    case 'write': {
                        if (!entry) {
                            const directory = await storage.getEntry(path.slice(0, path.length - 1));
                            if (!(directory instanceof StorageDirectory)) {
                                throw new Error('Parent of storage entry is not a directory.');
                            }
                            entry = await directory.createFile(path[path.length - 1]);
                        }

                        if (!(entry instanceof StorageFile)) {
                            throw new Error('Storage entry is not a file.');
                        }

                        // Write to file
                        await entry.write(args.buffer as ArrayBuffer, args.start as number, args.end as number);

                        break;
                    }
                }
            } catch (err) {
                console.error(err);

                // Write error response to data buffer
                state.data.clear();
                state.data.writeUint8(1);

                if (err instanceof Error) {
                    state.data.writeString(err.message);
                } else {
                    state.data.writeString('Unknown error.');
                }
            }

            // Notify worker
            Atomics.notify(state.arrayInt32, INDEX_WORKER_NOTIFY);

            // Release FS lock
            state.lockFs.release();

            debug('fs', 'FS is done');

            break;
        }
    }
};

const handleMessageError = (event: MessageEvent) => {
    console.error('Failed to deserialize message.', event);
};

addEventListener('message', handleMessage);
addEventListener('messageerror', handleMessage);
