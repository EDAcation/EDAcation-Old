import {deserializeState} from '../serializable';
import {SerializedStorage, Storage, StorageDirectory, StorageFile} from '../storage';

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
    console.log(event);

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

            console.log('FS received request', storageId, path, operation);

            const storage = state.storages[storageId];
            if (!storage) {
                console.error(`Unknown storage ID "${storageId}"`);
                break;
            }

            const entry = await storage.getEntry(path);

            console.log('FS is waiting for FS lock...');

            // Acquire FS lock
            state.lockFs.acquire();

            console.log('FS has FS lock');

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
                    case 'rmdir': {
                        if (!(entry instanceof StorageDirectory)) {
                            throw new Error('Storage entry is not a directory.');
                        }

                        // Delete directory
                        await entry.delete();

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

                        // Read file
                        const result = await entry.read(args.start as number, args.end as number);
                        const resultArray = new Uint8Array(result);

                        // Write response to data buffer
                        state.data.writeUint8Array(resultArray);

                        break;
                    }
                    case 'write': {
                        throw new Error('Not implemented');
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

            console.log('FS is done');

            break;
        }
    }
};

const handleMessageError = (event: MessageEvent) => {
    console.error('Failed to deserialize message.', event);
};

addEventListener('message', handleMessage);
addEventListener('messageerror', handleMessage);
