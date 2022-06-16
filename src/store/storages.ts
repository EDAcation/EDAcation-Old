import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Storage} from '../storage';
import {updateWorkerStorage} from '../workers';

export type StoragesState = Storage<unknown, unknown>[];

const initialState: StoragesState = [];

export const storagesSlice = createSlice({
    name: 'storages',
    initialState,
    reducers: {
        addStorage(state, action: PayloadAction<Storage<unknown, unknown>>) {
            state.push(action.payload);

            updateWorkerStorage(action.payload);
        },
        updateStorage(_state, action: PayloadAction<Storage<unknown, unknown>>) {
            updateWorkerStorage(action.payload);
        },
        removeStorage(state, action: PayloadAction<Storage<unknown, unknown>>) {
            return state.filter((storage) => storage.getID() !== action.payload.getID());
        }
    }
});

export const {addStorage, updateStorage, removeStorage} = storagesSlice.actions;
