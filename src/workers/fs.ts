import {deserializeState} from '../serializable';
import {SerializedStorage, Storage, StorageDirectory} from '../storage';

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
}

type Message = MessageInit | MessageWorker | MessageStorage | MessageCall;

interface State {
    sharedBuffer: SharedArrayBuffer;
    arrayUint8: Uint8Array;
    arrayInt32: Int32Array;
    ports: MessagePort[];

    storages: Record<string, Storage<unknown, unknown>>;
}

let state: State;

const handleMessage = async (event: MessageEvent<Message>) => {
    console.log(event);

    switch (event.data.type) {
        case 'init': {
            const {sharedBuffer} = event.data;

            state = {
                sharedBuffer,
                arrayUint8: new Uint8Array(sharedBuffer),
                arrayInt32: new Int32Array(sharedBuffer),
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
            const {jobId, storageId, path} = event.data;

            const storage = state.storages[storageId];
            if (!storage) {
                console.error(`Unknown storage ID "${storageId}"`);
                break;
            }

            const entry = await storage.getEntry(path);
            if (!(entry instanceof StorageDirectory)) {
                console.error('Storage entry is not a directory.');
                break;
            }

            const entries = await entry.getEntries(true);
            const result: string[] = [];
            for (const entry of entries) {
                result.push(entry.getName());
            }
            console.log(result);
            // TODO: send back

            const encoder = new TextEncoder();
            const data = encoder.encode(result.join(',').slice(0, 100));
            console.log(data);
            state.arrayUint8.set(data, 8);
            console.log(state.arrayUint8.slice(8, 16));

            Atomics.store(state.arrayInt32, 1, jobId);
            Atomics.notify(state.arrayInt32, 1);

            break;
        }
    }
};

const handleMessageError = (event: MessageEvent) => {
    console.error('Failed to deserialize message.', event);
};

addEventListener('message', handleMessage);
addEventListener('messageerror', handleMessage);
