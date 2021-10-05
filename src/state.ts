import {Storage, storageByType} from './storage';

export interface State {
    storages: Storage<unknown, unknown>[];
}

const DEFAULT_STATE: State = {
    storages: []
};

// TODO: change to IndexedDB to allow storage of file handles (https://github.com/WICG/file-system-access/blob/main/EXPLAINER.md)

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loadState = (): State => {
    // Load state from local storage
    let serializedState: any;
    try {
        serializedState = JSON.parse(localStorage.getItem('state') ?? '');
    } catch (err) {
        serializedState = DEFAULT_STATE;
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

export const storeState = (state: State) => {
    // Serialize state
    const serializedState = {
        ...state,
        storages: state.storages.map((storage) => ({
            type: storage.getType(),
            ...storage.serialize()
        }))
    };

    // Store state in local storage
    // localStorage.setItem('state', JSON.stringify(serializedState));
};
