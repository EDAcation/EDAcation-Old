import React, {useContext, useEffect, useState} from 'react';
import MonacoEditor, {loader} from '@monaco-editor/react';

import {EditorFile} from '../../state';
import {StateContext} from '../state/StateContext';

export interface EditorMonacoProps {
    file: EditorFile;
}

// Preload Monaco editor
loader.init();

export const EditorMonaco: React.FC<EditorMonacoProps> = ({file}) => {
    const [state] = useContext(StateContext);
    const [id, setId] = useState(file.id);
    const [value, setValue] = useState(file.content);

    useEffect(() => {
        if (id !== file.id) {
            setId(file.id);
            setValue(file.content);
        }
    }, [file]);

    return (
        <MonacoEditor
            path={[file.storage.getID()].concat(file.path).join('/')}
            theme={state.theme === 'light' ? 'vs-light' : 'vs-dark'}
            value={value}
            onChange={(newValue) => setValue(newValue || value)}
            onMount={(editor) => editor.focus()}
            options={{
                automaticLayout: true
            }}
        />
    );
};
