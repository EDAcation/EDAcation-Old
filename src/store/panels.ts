import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

export enum PanelType {
    SPLIT = 'SPLIT',
    EDITOR = 'EDITOR'
}

export interface Panel {
    id: string;
    type: PanelType;
}

export interface PanelSplit extends Panel {
    type: PanelType.SPLIT;
    direction: 'horizontal' | 'vertical';
    children: Panel[];
}

export interface PanelEditor extends Panel {
    type: PanelType.EDITOR;
    fileIds: string[];
}

export type PanelsState = Panel;

const panel: PanelSplit = {
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

export const panelsSlice = createSlice({
    name: 'panels',
    initialState,
    reducers: {
        addPanel(state, action: PayloadAction<{parentId: string; panel: Panel}>) {
            const parentPanel = findPanelById(state, action.payload.parentId);
            if (!parentPanel) {
                throw new Error(`Unknown panel ID "${action.payload.parentId}"`);
            }

            if (parentPanel.type === PanelType.SPLIT) {
                const panelSplit = parentPanel as PanelSplit;
                panelSplit.children.push(panel);
            }
        },
        removePanel(state, action: PayloadAction<Panel>) {
            // TODO
        },

        openFile(state, action: PayloadAction<{fileId: string; panelId?: string}>) {
            let panel: Panel | null = null;
            if (action.payload.panelId) {
                panel = findPanelById(state, action.payload.panelId);
                if (panel && panel.type !== PanelType.EDITOR) {
                    panel = null;
                }
            }
            if (!panel) {
                panel = findPanelByType(state, PanelType.EDITOR);
            }

            if (panel) {
                const panelEditor = panel as PanelEditor;
                panelEditor.fileIds.push(action.payload.fileId);
            } else {
                const panelEditor: PanelEditor = {
                    id: uuidv4(),
                    type: PanelType.EDITOR,
                    fileIds: [action.payload.fileId]
                };
                const panelSplit = findPanelByType(state, PanelType.SPLIT) as PanelSplit;
                panelSplit.children.push(panelEditor);
            }
        }
    }
});

export const {addPanel, removePanel, openFile} = panelsSlice.actions;
