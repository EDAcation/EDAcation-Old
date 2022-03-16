import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {StorageDirectory, StorageEntry} from '../storage';

export type StorageEntriesState = Record<string, StorageEntry<unknown, unknown>[]>;

const initialState: StorageEntriesState = {};

export const loadStorageEntries = createAsyncThunk(
    'loadStorageEntries',
    async (directory: StorageDirectory<unknown, unknown>) => {
        return await directory.getEntries(true);
    }
);

export const deleteStorageEntry = createAsyncThunk(
    'deleteStorageEntry',
    async (entry: StorageEntry<unknown, unknown>, thunkAPI) => {
        await entry.delete();

        const parent = entry.getParent();
        if (parent) {
            thunkAPI.dispatch(loadStorageEntries(parent));
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
