import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {StorageDirectory, StorageEntry, StorageFile} from '../storage';

export type StorageEntriesState = Record<string, StorageEntry<unknown, unknown>[]>;

const initialState: StorageEntriesState = {};

export const loadStorageEntries = createAsyncThunk(
    'loadStorageEntries',
    async (directory: StorageDirectory<unknown, unknown>) => {
        return await directory.getEntries(true);
    }
);

interface CreateStorageDirectoryPayload {
    parent: StorageDirectory<unknown, unknown>;
    name: string;
}

export const createStorageDirectory = createAsyncThunk(
    'createStorageEntry',
    async ({parent, name}: CreateStorageDirectoryPayload, thunkAPI) => {
        const directory = await parent.createDirectory(name);

        await thunkAPI.dispatch(loadStorageEntries(parent));

        return directory;
    }
);

interface CreateStorageFilePayload {
    parent: StorageDirectory<unknown, unknown>;
    name: string;
    content?: unknown;
    isJSON?: boolean;
}

export const createStorageFile = createAsyncThunk(
    'createStorageEntry',
    async ({parent, name, content, isJSON}: CreateStorageFilePayload, thunkAPI) => {
        const file = await parent.createFile(name);
        if (content) {
            if (isJSON) {
                await file.writeJSON(content);
            } else if (typeof content === 'string') {
                await file.writeText(content);
            } else if (content instanceof ArrayBuffer) {
                await file.write(content);
            } else {
                throw new Error(`Unknown content type "${typeof content}"`);
            }
        }

        await thunkAPI.dispatch(loadStorageEntries(parent));

        return file;
    }
);

export const deleteStorageEntry = createAsyncThunk(
    'deleteStorageEntry',
    async (entry: StorageEntry<unknown, unknown>, thunkAPI) => {
        await entry.delete(true);

        const parent = entry.getParent();
        if (parent) {
            await thunkAPI.dispatch(loadStorageEntries(parent));
        }

        if (entry instanceof StorageDirectory) {
            // TODO: close editor files recursively
        } else if (entry instanceof StorageFile) {
            // TODO: close editor files
        }
    }
);

export const storageEntriesSlice = createSlice({
    name: 'storageEntries',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadStorageEntries.fulfilled, (state, action) => {
            state[action.meta.arg.getFullPath()] = action.payload?.sort((a, b) => {
                if (a.getType() !== b.getType()) {
                    return a.getType() < b.getType() ? -1 : 1;
                }
                return a.getName() < b.getName() ? -1 : 1;
            });
        });
    }
});

// export const {} = storageEntriesSlice.actions;
