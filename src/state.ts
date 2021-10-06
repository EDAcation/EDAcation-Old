import {get, set} from 'idb-keyval';

import {Storage, storageByType} from './storage';

export interface State {
    storages: Storage<unknown, unknown>[];
}

export const DEFAULT_STATE: State = {
    storages: []
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loadState = async (): Promise<State> => {
    // Load state from IndexedDB
    const serializedState = await get('state');
    if (!serializedState) {
        return DEFAULT_STATE;
    }

    // Deserialize state
    return {
        storages: serializedState.storages.map((data: any) => {
            if (!data.type || !storageByType[data.type]) {
                throw Error(`Unknown storage type "${data.type}"`);
            }

            const storage = new storageByType[data.type]();
            storage.deserialize(data);
            return storage;
        })
    };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const storeState = async (state: State) => {
    // Serialize state
    const serializedState = {
        ...state,
        storages: state.storages.map((storage) => ({
            type: storage.getType(),
            ...storage.serialize()
        }))
    };

    // Store state in IndexedDB
    await set('state', serializedState);
};
