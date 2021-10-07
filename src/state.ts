import {get, set} from 'idb-keyval';

import {Storage, storageByType, StorageFile} from './storage';

export interface EditorFile {
    id: string;
    storage: Storage<unknown, unknown>;
    path: string[];
    file?: StorageFile<unknown, unknown>;
    content?: string;
}

export interface State {
    loading: boolean;
    storages: Storage<unknown, unknown>[];
    editor: {
        files: EditorFile[];
        openFileId: string | null;
    };
}

export const DEFAULT_STATE: State = {
    loading: true,
    storages: [],
    editor: {
        files: [],
        openFileId: null
    }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loadState = async (): Promise<State> => {
    const state = {
        ...DEFAULT_STATE,
        loading: false
    };

    // Load state from IndexedDB
    const serializedState = await get('state');
    if (!serializedState) {
        return state;
    }

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
        state.editor.openFileId = serializedState.editor.openFileId;

        // Deserialize open files
        for await (const serializedFile of serializedState.editor.files) {
            const storage = state.storages.find((s) => s.getID() === serializedFile.file.storage);
            if (!storage) {
                continue;
            }

            state.editor.files.push({
                id: serializedFile.file.id,
                storage,
                path: serializedFile.file.path
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
            files: state.editor.files.map((file) => ({
                file: {
                    ...file,
                    storage: file.storage.getID()
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
