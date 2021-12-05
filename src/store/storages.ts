import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Storage} from '../storage';

export type StoragesState = Storage<unknown, unknown>[];

const initialState: StoragesState = [];

export const storagesSlice = createSlice({
    name: 'storages',
    initialState,
    reducers: {
        addStorage(state, action: PayloadAction<Storage<unknown, unknown>>) {
            state.push(action.payload);
        },
        removeStorage(state, action: PayloadAction<Storage<unknown, unknown>>) {
            return state.filter((storage) => storage.getID() !== action.payload.getID());
        }
    }
});

export const {addStorage, removeStorage} = storagesSlice.actions;
