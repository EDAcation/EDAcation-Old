import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {EditorFile} from '../state';

export type FilesState = EditorFile[];

const initialState: FilesState = [];

export const accessFiles = createAsyncThunk(
    'accessFiles',
    async (files: EditorFile[]) => {
        for (const file of files) {
            await file.access();
        }
        return files;
    }
);

export const loadFile = createAsyncThunk(
    'loadFile',
    async (file: EditorFile) => {
        await file.load();
        return file;
    }
);

export const saveFile = createAsyncThunk(
    'saveFile',
    async (file: EditorFile) => {
        await file.save();
        return file;
    }
);

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile(state, action: PayloadAction<EditorFile>) {
            state.push(action.payload);
        },
        removeFile(state, action: PayloadAction<EditorFile>) {
            return state.filter((file) => file.getID() !== action.payload.getID());
        },
        changeFile(state, action: PayloadAction<{file: EditorFile; content: string}>) {
            const {file, content} = action.payload;
            file.change(content);
            return state.filter((file) => file.getID() !== file.getID()).concat([file]);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(accessFiles.fulfilled, (state, action) => {
            return state.filter((file) => !action.payload.some((f) => f.getID() === file.getID())).concat(action.payload);
        });
        builder.addCase(loadFile.fulfilled, (state, action) => {
            return state.filter((file) => file.getID() !== action.payload.getID()).concat([action.payload]);
        });
        builder.addCase(saveFile.fulfilled, (state, action) => {
            return state.filter((file) => file.getID() !== action.payload.getID()).concat([action.payload]);
        });
    }
});

export const {addFile, removeFile, changeFile} = filesSlice.actions;
