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

export const doAccessFile = async (file: EditorFile) => {
    if (await file.storage.hasPermission()) {
        return await file.storage.getEntry(file.path);
    }

    return undefined;
};

export const accessFile = createAsyncThunk(
    'accessFile',
    async (file: EditorFile) => {
        return await doAccessFile(file);
    }
);

export const accessFiles = createAsyncThunk(
    'accessFiles',
    async (files: EditorFile[]) => {
        const results: (StorageFile<unknown, unknown> | undefined)[] = [];
        for (const file of files) {
            results.push(await doAccessFile(file));
        }
        return results;
    }
);

export const loadFile = createAsyncThunk(
    'loadFile',
    async (file: EditorFile) => {
        if (!file.isAccessible || !file.file) {
            throw new Error('Editor file is not accessible.');
        } else if (file.isLoaded) {
            throw new Error('Editor file is already loaded.');
        }

        return await file.file?.read();
    }
);

export const saveFile = createAsyncThunk(
    'saveFile',
    async ({file, force = false}: {file: EditorFile; force?: boolean}) => {
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

        return file.content;
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
        builder.addCase(accessFile.fulfilled, (state, action) => {
            const file = state.find((file) => file.id === action.meta.arg.id);
            if (file) {
                file.file = action.payload;
                file.isAccessible = true;
                file.isLoaded = false;
            }
        });

        builder.addCase(accessFiles.fulfilled, (state, action) => {
            action.meta.arg.forEach(({id}, index) => {
                const file = state.find((file) => file.id === id);
                if (file) {
                    file.file = action.payload[index];
                    file.isAccessible = true;
                    file.isLoaded = false;
                }
            });
        });

        builder.addCase(loadFile.fulfilled, (state, action) => {
            const file = state.find((file) => file.id === action.meta.arg.id);
            if (file) {
                file.originalContent = action.payload;
                file.content = action.payload;
                file.isLoaded = true;
                file.isSaved = true;
            }
        });

        builder.addCase(saveFile.fulfilled, (state, action) => {
            const file = state.find((file) => file.id === action.meta.arg.file.id);
            if (file) {
                file.originalContent = action.payload;
                file.isSaved = true;
            }
        });
    }
});

export const {addFile, removeFile, changeFile} = filesSlice.actions;
