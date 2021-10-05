import React, {useState} from 'react';
import MonacoEditor from '@monaco-editor/react';

export const EditorMonaco: React.FC = () => {
    const [value, setValue] = useState('');

    return (
        <MonacoEditor
            language="json"
            theme="vs-dark"
            value={value}
            onChange={(newValue) => setValue(newValue || value)}
            onMount={(editor) => editor.focus()}
        />
    );
};
