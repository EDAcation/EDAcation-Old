import React, {useContext} from 'react';
import MonacoEditor, {loader, OnMount} from '@monaco-editor/react';

import {EditorFile} from '../../state';
import {StateContext} from '../state/StateContext';

import {BaseEditorProps} from './BaseEditor';

// Preload Monaco editor
loader.init();

export type EditorMonacoProps = BaseEditorProps;

// NOTE: Ugly hack to have file access in commands
let latestFile: EditorFile;

export const EditorMonaco: React.FC<BaseEditorProps> = ({file, value, onChange, onSave}) => {
    const [state] = useContext(StateContext);

    // NOTE: Ugly hack to have file access in commands
    latestFile = file;

    const handleMount: OnMount = (editor, monaco) => {
        // @ts-expect-error: KEY_S does not exist on the type, but gives the correct value
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
            if (onSave) {
                onSave(latestFile);
            }
        });
    };

    return (
        <MonacoEditor
            path={file.getFullPath()}
            theme={state.theme === 'light' ? 'vs-light' : 'vs-dark'}
            value={value}
            onMount={handleMount}
            onChange={(newValue) => onChange(file, newValue ?? '')}
            options={{
                automaticLayout: true
            }}
        />
    );
};
