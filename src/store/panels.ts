import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

import {StorageFile} from '../storage';
import {RootState} from '../store';

import {addFile, loadFile} from './files';

export enum PanelType {
    SPLIT = 'SPLIT',
    EDITOR = 'EDITOR'
}

export interface BasePanel {
    parentId: string;
    id: string;
}

export interface PanelSplit extends BasePanel {
    type: PanelType.SPLIT;
    direction: 'horizontal' | 'vertical';
    children: Panel[];
}

export interface PanelEditorFile {
    id: string;
    editorId?: string;
}

export interface PanelEditor extends BasePanel {
    type: PanelType.EDITOR;
    files: PanelEditorFile[];
    currentFileId: string;
}

export type Panel = PanelSplit | PanelEditor;

export type PanelsState = Panel;

const panel: PanelSplit = {
    parentId: '',
    id: uuidv4(),
    type: PanelType.SPLIT,
    direction: 'horizontal',
    children: []
};

const initialState: PanelsState = panel;

export const findPanelById = (panel: Panel, id: string): Panel | null => {
    if (panel.id === id) {
        return panel;
    }

    if (panel.type === PanelType.SPLIT) {
        for (const child of (panel as PanelSplit).children) {
            const result = findPanelById(child, id);
            if (result) {
                return result;
            }
        }
    }

    return null;
};

export const findPanelByType = (panel: Panel, type: PanelType): Panel | null => {
    if (panel.type === type) {
        return panel;
    }

    if (panel.type === PanelType.SPLIT) {
        for (const child of (panel as PanelSplit).children) {
            const result = findPanelByType(child, type);
            if (result) {
                return result;
            }
        }
    }

    return null;
};

export const findPanelByFileId = (panel: Panel, fileId: string, panelId?: string): PanelEditor | null => {
    if (panel.type === PanelType.EDITOR && panel.files.some((f) => f.id === fileId)) {
        if (!panelId || panel.id === panelId) {
            return panel;
        }
    }

    if (panel.type === PanelType.SPLIT) {
        for (const child of (panel as PanelSplit).children) {
            const result = findPanelByFileId(child, fileId, panelId);
            if (result) {
                return result;
            }
        }
    }

    return null;
};

const replacePanel = (root: Panel, oldPanel: Panel, newPanel: Panel) => {
    if (panel === root || panel.parentId === '') {
        // Can't replace root panel
        return;
    }

    const parentPanel = findPanelById(root, panel.parentId);
    if (!parentPanel) {
        throw new Error(`Unknown parent panel ID "${panel.parentId}"`);
    }

    if (parentPanel.type === PanelType.SPLIT) {
        const panelSplit = parentPanel as PanelSplit;

        panelSplit.children.splice(panelSplit.children.indexOf(oldPanel), 1, newPanel);
    } else {
        throw new Error(`Panel "${parentPanel.id}" can't have children.`);
    }
};

const closePanel = (root: Panel, panel: Panel) => {
    if (panel === root || panel.parentId === '') {
        // Can't close root panel
        return;
    }

    const parentPanel = findPanelById(root, panel.parentId);
    if (!parentPanel) {
        throw new Error(`Unknown parent panel ID "${panel.parentId}"`);
    }

    if (parentPanel.type === PanelType.SPLIT) {
        const panelSplit = parentPanel as PanelSplit;

        panelSplit.children.splice(panelSplit.children.findIndex((p) => p.id === panel.id), 1);

        if (panelSplit.children.length === 0) {
            closePanel(root, panelSplit);
        } else if (panelSplit.children.length === 1) {
            replacePanel(root, panelSplit, panel);
        }
    } else {
        throw new Error(`Panel "${parentPanel.id}" can't have children.`);
    }
};

interface OpenFilePayload {
    file: StorageFile<unknown, unknown>;
    panelId?: string;
    existing?: boolean;
    split?: boolean;
    reload?: boolean;
}

export const openFile = createAsyncThunk(
    'openFile',
    async ({file, reload, ...payload}: OpenFilePayload, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;

        // Check if this file already exists
        const existingFile = state.files.find((f) => [f.storageId].concat(f.path).join('/') === file.getFullPath());
        if (existingFile) {
            if (existingFile.isLoaded && reload) {
                thunkAPI.dispatch(loadFile({
                    file: existingFile,
                    force: true
                }));
            }

            // Return the existing file ID
            return {
                fileId: existingFile.id,
                ...payload
            };
        }

        // Add the file and return its file ID
        const id = uuidv4();
        thunkAPI.dispatch(addFile({
            id,
            file
        }));
        return {
            fileId: id,
            ...payload
        };
    }
);

export const panelsSlice = createSlice({
    name: 'panels',
    initialState,
    reducers: {
        addPanel(state, action: PayloadAction<Panel>) {
            const parentPanel = findPanelById(state, action.payload.parentId);
            if (!parentPanel) {
                throw new Error(`Unknown parent panel ID "${action.payload.parentId}"`);
            }

            if (parentPanel.type === PanelType.SPLIT) {
                const panelSplit = parentPanel as PanelSplit;
                panelSplit.children.push(panel);
            } else {
                throw new Error(`Panel "${parentPanel.id}" can't have children.`);
            }
        },

        removePanel(state, action: PayloadAction<Panel>) {
            closePanel(state, action.payload);
        },

        viewFile(state, action: PayloadAction<{fileId: string; panelId?: string}>) {
            const panel = findPanelByFileId(state, action.payload.fileId, action.payload.panelId);
            if (panel) {
                panel.currentFileId = action.payload.fileId;
            } else {
                console.warn(`Unable to view file "${action.payload.fileId}"`);
            }
        },

        closeFile(state, action: PayloadAction<{fileId: string; panelId?: string}>) {
            const panel = findPanelByFileId(state, action.payload.fileId, action.payload.panelId);
            if (panel) {
                const index = panel.files.findIndex((f) => f.id === action.payload.fileId);
                panel.files.splice(index, 1);

                if (panel.files.length === 0) {
                    closePanel(state, panel);
                } else if (panel.currentFileId === action.payload.fileId) {
                    panel.currentFileId = panel.files[Math.min(Math.max(0, index - 1), panel.files.length - 1)].id;
                }
            } else {
                console.warn(`Unable to close file "${action.payload.fileId}"`);
            }
        },

        changeFileEditor(state, action: PayloadAction<{fileId: string; panelId?: string; editorId: string}>) {
            const panel = findPanelByFileId(state, action.payload.fileId, action.payload.panelId);
            if (panel) {
                const file = panel.files.find((f) => f.id === action.payload.fileId);
                if (file) {
                    file.editorId = action.payload.editorId;
                } else {
                    console.warn(`Unable to change file "${action.payload.fileId}"`);
                }
            } else {
                console.warn(`Unable to change file "${action.payload.fileId}"`);
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(openFile.fulfilled, (state, action) => {
            let panel: Panel | null = null;
            if (action.payload.panelId) {
                panel = findPanelById(state, action.payload.panelId);
                if (panel && panel.type !== PanelType.EDITOR) {
                    panel = null;
                }
            }

            if (!panel && action.payload.existing) {
                panel = findPanelByFileId(state, action.payload.fileId);
            }

            if (!panel && !action.payload.split) {
                panel = findPanelByType(state, PanelType.EDITOR);
            }

            if (panel) {
                const panelEditor = panel as PanelEditor;

                if (!panelEditor.files.some((f) => f.id === action.payload.fileId)) {
                    panelEditor.files.push({
                        id: action.payload.fileId
                    });
                }

                panelEditor.currentFileId = action.payload.fileId;
            } else {
                const panelSplit = findPanelByType(state, PanelType.SPLIT) as PanelSplit;

                const panelEditor: PanelEditor = {
                    parentId: panelSplit.id,
                    id: uuidv4(),
                    type: PanelType.EDITOR,
                    files: [{
                        id: action.payload.fileId
                    }],
                    currentFileId: action.payload.fileId
                };
                panelSplit.children.push(panelEditor);
            }
        });
    }
});

export const {addPanel, removePanel, viewFile, closeFile, changeFileEditor} = panelsSlice.actions;
