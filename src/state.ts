import {get, set} from 'idb-keyval';

import {Storage, storageByType, StorageFile} from './storage';

export interface EditorFile {
    file: StorageFile<unknown, unknown>;
}

export interface State {
    editor: {
        files: EditorFile[];
    };
    storages: Storage<unknown, unknown>[];
}

export const DEFAULT_STATE: State = {
    editor: {
        files: []
    },
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
    const state = DEFAULT_STATE;

    // Deserialize storages
    state.storages = (serializedState.storages as any[])
        .map((data: any): Storage<unknown, unknown> | null => {
            if (!data.type || !storageByType[data.type]) {
                return null;
            }

            const storage: Storage<unknown, unknown> = new storageByType[data.type](data.id);
            storage.deserialize(data);
            return storage;
        })
        .filter((s): s is Storage<unknown, unknown> => s !== null);

    // Deserialize editor
    if (serializedState.editor) {
        // Deserialize open files
        for await (const serializedFile of serializedState.editor.files) {
            const storage = state.storages.find((s) => s.getID() === serializedFile.file.storageId);
            if (!storage) {
                continue;
            }

            state.editor.files.push({
                file: await storage.getEntry(serializedFile.path as string[])
            });
        }
    }

    return state;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const storeState = async (state: State) => {
    // Serialize state
    const serializedState = {
        ...state,
        editor: {
            ...state.editor,
            // TODO
            files: state.editor.files.map((file) => ({
                file: {
                    // storageId:
                }
            }))
        },
        storages: state.storages.map((storage) => ({
            type: storage.getType(),
            id: storage.getID(),
            ...storage.serialize()
        }))
    };

    // Store state in IndexedDB
    await set('state', serializedState);
};
