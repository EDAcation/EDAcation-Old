import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

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

export interface PanelEditor extends BasePanel {
    type: PanelType.EDITOR;
    fileIds: string[];
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

const findPanelById = (panel: Panel, id: string): Panel | null => {
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

const findPanelByType = (panel: Panel, type: PanelType): Panel | null => {
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

const findPanelByFileId = (panel: Panel, fileId: string, panelId?: string): PanelEditor | null => {
    if (panel.type === PanelType.EDITOR && panel.fileIds.includes(fileId)) {
        if (!panelId || panel.id === panelId) {
            return panel;
        }
    }

    if (panel.type === PanelType.SPLIT) {
        for (const child of (panel as PanelSplit).children) {
            const result = findPanelByFileId(child, fileId);
            if (result) {
                return result;
            }
        }
    }

    return null;
};

const closePanel = (root: Panel, panel: Panel) => {
    if (root === panel || panel.parentId === '') {
        throw new Error(`Can't close root panel`);
    }

    const parentPanel = findPanelById(root, panel.parentId);
    if (!parentPanel) {
        throw new Error(`Unknown parent panel ID "${panel.parentId}"`);
    }

    if (parentPanel.type === PanelType.SPLIT) {
        const panelSplit = parentPanel as PanelSplit;
        panelSplit.children.splice(panelSplit.children.findIndex((p) => p.id === panel.id), 1);
    } else {
        throw new Error(`Panel "${parentPanel.id}" can't have children.`);
    }
};

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

        openFile(state, action: PayloadAction<{fileId: string; panelId?: string; split?: boolean}>) {
            let panel: Panel | null = null;
            if (action.payload.panelId) {
                panel = findPanelById(state, action.payload.panelId);
                if (panel && panel.type !== PanelType.EDITOR) {
                    panel = null;
                }
            }
            if (!panel && !action.payload.split) {
                panel = findPanelByType(state, PanelType.EDITOR);
            }

            if (panel) {
                const panelEditor = panel as PanelEditor;
                panelEditor.fileIds.push(action.payload.fileId);

                if (!panelEditor.fileIds.includes(panelEditor.currentFileId)) {
                    panelEditor.currentFileId = action.payload.fileId;
                }
            } else {
                const panelSplit = findPanelByType(state, PanelType.SPLIT) as PanelSplit;

                const panelEditor: PanelEditor = {
                    parentId: panelSplit.id,
                    id: uuidv4(),
                    type: PanelType.EDITOR,
                    fileIds: [action.payload.fileId],
                    currentFileId: action.payload.fileId
                };
                panelSplit.children.push(panelEditor);
            }
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
                const index = panel.fileIds.indexOf(action.payload.fileId);
                panel.fileIds.splice(index, 1);

                if (panel.fileIds.length === 0) {
                    closePanel(state, panel);
                } else if (panel.currentFileId === action.payload.fileId) {
                    panel.currentFileId = panel.fileIds[Math.min(Math.max(0, index - 1), panel.fileIds.length - 1)];
                }
            } else {
                console.warn(`Unable to view file "${action.payload.fileId}"`);
            }
        }
    }
});

export const {addPanel, removePanel, openFile, viewFile, closeFile} = panelsSlice.actions;
