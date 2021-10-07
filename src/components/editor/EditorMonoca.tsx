import React, {useEffect, useState} from 'react';
import MonacoEditor, {loader} from '@monaco-editor/react';

import {EditorFile} from '../../state';

export interface EditorMonacoProps {
    file: EditorFile;
}

// Preload Monaco editor
loader.init();

export const EditorMonaco: React.FC<EditorMonacoProps> = ({file}) => {
    const [id, setId] = useState(file.id);
    const [value, setValue] = useState(file.content);

    useEffect(() => {
        if (id !== file.id) {
            setId(file.id);
            setValue(file.content);
        }
    }, [file]);

    console.log(file);

    return (
        <MonacoEditor
            language="json"
            theme="vs-dark"
            value={value}
            onChange={(newValue) => setValue(newValue || value)}
            onMount={(editor) => editor.focus()}
            options={{
                automaticLayout: true
            }}
        />
    );
};
