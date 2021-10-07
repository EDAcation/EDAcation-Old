import React, {useState} from 'react';
import MonacoEditor from '@monaco-editor/react';

import {EditorFile} from '../../state';

export interface EditorMonacoProps {
    file: EditorFile;
}

export const EditorMonaco: React.FC<EditorMonacoProps> = ({file}) => {
    const [value, setValue] = useState(file.content);

    console.log(value);

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
