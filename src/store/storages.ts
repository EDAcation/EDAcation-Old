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
        }
    }
});

export const {addStorage} = storagesSlice.actions;
