import React from 'react';

import {EditorFileLoaded} from '../../../store/files';

import {BaseEditorProps} from './BaseEditor';
import {EditorGraphviz} from './EditorGraphviz';
import {EditorDigitalJS} from './EditorDigitalJS';
import {EditorMonaco} from './EditorMonoca';
import {EditorSVG} from './EditorSVG';

export interface EditorDefinition {
    id: string;
    name: string;
    component: React.FC<BaseEditorProps>;
    isDefault?: boolean;
    extensions?: string[];
    canOpen?: (file: EditorFileLoaded) => boolean;
}

export const EDITORS: EditorDefinition[] = [{
    id: 'graphviz',
    name: 'Graphviz',
    component: EditorGraphviz,
    extensions: ['dot']
}, {
    id: 'svg',
    name: 'SVG',
    component: EditorSVG,
    extensions: ['svg']
}, {
    id: 'digitaljs',
    name: 'DigitalJS simulator',
    component: EditorDigitalJS,
    extensions: ['json'],
    canOpen(file: EditorFileLoaded) {
        try {
            const data = JSON.parse(file.content);
            return data.creator && data.creator.toLowerCase().includes('yosys');
        } catch (err) {
            if (err instanceof SyntaxError) {
                // Ignore JSON syntax errors
            } else {
                throw err;
            }
        }
    }
}, {
    id: 'monaco',
    name: 'Monaco text editor',
    component: EditorMonaco,
    isDefault: true
}];

export const getEditors = (loadedFile: EditorFileLoaded) => {
    const extension = loadedFile.file.getExtension();

    return EDITORS.filter((editor) => {
        if (editor.extensions && !editor.extensions.includes(extension)) {
            return false;
        }

        if (editor.canOpen && !editor.canOpen(loadedFile)) {
            return false;
        }

        return true;
    });
};
