import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Storage, StorageFile} from '../storage';

export interface EditorFile {
    id: string;
    storageId: string;
    storage: Storage<unknown, unknown>;
    path: string[];
    file?: StorageFile<unknown, unknown>;
    originalContent?: string;
    content?: string;
    isAccessible: boolean;
    isLoaded: boolean;
    isSaved: boolean;
}

export interface EditorFileAccessed extends EditorFile {
    isAccessible: true;
    file: StorageFile<unknown, unknown>;
}

export interface EditorFileLoaded extends EditorFileAccessed {
    isLoaded: true;
    originalContent: string;
    content: string;
}

// TODO: use persist transformer for serialization

export type FilesState = EditorFile[];

const initialState: FilesState = [];

export const accessFiles = createAsyncThunk(
    'accessFiles',
    async (files: EditorFile[]) => {
        for (const file of files) {
            // await file.access();

            // TODO: catch storage error

            if (await file.storage.hasPermission()) {
                file.file = await file.storage.getEntry(file.path);
                file.isAccessible = true;
                file.isLoaded = false;
            }
        }
        return files;
    }
);

export const loadFile = createAsyncThunk(
    'loadFile',
    async (file: EditorFile) => {
        // await file.load();

        if (!file.isAccessible) {
            throw new Error('Editor file is not accessible.');
        } else if (file.isLoaded) {
            throw new Error('Editor file is already loaded.');
        }

        file.originalContent = await file.file?.read();
        file.content = file.originalContent;
        file.isLoaded = true;

        return file;
    }
);

export const saveFile = createAsyncThunk(
    'saveFile',
    async ({file, force = false}: {file: EditorFile; force?: boolean}) => {
        // await file.save();

        if (!file.isLoaded) {
            throw new Error('Editor file is not loaded.');
        } else if (!file.content) {
            throw new Error('Edtitor file has no content.');
        }

        const currentContent = await file.file?.read();
        if (!force && currentContent !== file.originalContent) {
            throw new Error('Editor file has been changed on storage.');
        }

        await file.file?.write(file.content);

        file.isSaved = true;
        file.originalContent = file.content;

        return file;
    }
);

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile(state, action: PayloadAction<{id: string; file: StorageFile<unknown, unknown>}>) {
            state.push({
                id: action.payload.id,
                storageId: action.payload.file.getStorage().getID(),
                storage: action.payload.file.getStorage(),
                path: action.payload.file.getPath(),
                isAccessible: false,
                isLoaded: false,
                isSaved: false
            });
        },
        removeFile(state, action: PayloadAction<string>) {
            return state.filter((file) => file.id !== action.payload);
        },
        changeFile(state, action: PayloadAction<{fileId: string; content: string}>) {
            const file = state.find((f) => f.id === action.payload.fileId);
            if (!file) {
                throw new Error(`Unknown file ID "${action.payload.fileId}"`);
            }
            file.content = action.payload.content;
            file.isSaved = file.content === file.originalContent;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(accessFiles.fulfilled, (state, action) => {
            return state.filter((file) => !action.payload.some((f) => f.id === file.id)).concat(action.payload);
        });
        builder.addCase(loadFile.fulfilled, (state, action) => {
            return state.filter((file) => file.id !== action.payload.id).concat([action.payload]);
        });
        builder.addCase(saveFile.fulfilled, (state, action) => {
            return state.filter((file) => file.id !== action.payload.id).concat([action.payload]);
        });
    }
});

export const {addFile, removeFile, changeFile} = filesSlice.actions;
