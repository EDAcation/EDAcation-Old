import {deserializeState} from '../serializable';
import {SerializedStorage, Storage, StorageDirectory} from '../storage';

// NOTE: hack to ensure storage is imported as values and not just as types
console.log(Storage);

interface MessageInit {
    type: 'init';
    storage: SerializedStorage;
}

interface MessageCall {
    type: 'call';
    storageId: string;
    path: string[];
}

type Message = MessageInit | MessageCall;

const storages: Record<string, Storage<unknown, unknown>> = {};

console.log('test');

addEventListener('connect', (event: MessageEvent) => {
    const port = event.ports[0];

    console.log('connected', event);

    port.postMessage(['test']);

    port.onmessage = async (event: MessageEvent<Message>) => {
        console.log(event);

        switch (event.data.type) {
            case 'init': {
                const storage = deserializeState<Storage<unknown, unknown>>(event.data.storage);
                storages[storage.getID()] = storage;
                break;
            }
            case 'call': {
                const storage = storages[event.data.storageId];
                if (!storage) {
                    console.error(`Unknown storage ID "${event.data.storageId}"`);
                    break;
                }

                const entry = await storage.getEntry(event.data.path);
                if (!(entry instanceof StorageDirectory)) {
                    console.error('Entry is not a directory.');
                    break;
                }

                const entries = await entry.getEntries(true);
                const result: string[] = [];
                for (const entry of entries) {
                    result.push(entry.getName());
                }
                console.log(result);
                // TODO: send back

                break;
            }
        }
    };
});
