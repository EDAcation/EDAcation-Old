import {deserializeState} from '../serializable';
import {SerializedStorage, Storage, StorageDirectory} from '../storage';

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
            const {storageId, path, operation} = event.data;

            console.log('FS received request', storageId, path, operation);

            const storage = state.storages[storageId];
            if (!storage) {
                console.error(`Unknown storage ID "${storageId}"`);
                break;
            }

            console.log('FS is waiting for FS lock...');

            // Acquire FS lock
            state.lockFs.acquire();

            console.log('FS has FS lock');

            // Perform operation
            const result: string[] = [];
            switch (operation) {
                case 'readdir': {
                    const entry = await storage.getEntry(path);
                    if (!(entry instanceof StorageDirectory)) {
                        console.error('Storage entry is not a directory.');
                        break;
                    }

                    const entries = await entry.getEntries(true);
                    for (const entry of entries) {
                        result.push(entry.getName());
                    }
                    break;
                }
            }

            // Write response to data buffer
            state.data.resetOffset();
            state.data.writeStringArray(result);

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
