import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {EditorFile} from '../state';

export type FilesState = EditorFile[];

const initialState: FilesState = [];

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile(state, action: PayloadAction<EditorFile>) {
            state.push(action.payload);
        },
        updateFile(state, action: PayloadAction<EditorFile>) {
            state.splice(state.findIndex((file) => file.id === action.payload.id), 1, action.payload);
        },
        removeFile(state, action: PayloadAction<EditorFile>) {
            return state.filter((file) => file.id !== action.payload.id);
        }
    }
});

export const {addFile, updateFile, removeFile} = filesSlice.actions;
