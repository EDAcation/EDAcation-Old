import React, {useState} from 'react';
import MonacoEditor, {EditorDidMount} from 'react-monaco-editor';

export const EditorMonaco: React.FC = () => {
    const [value, setValue] = useState('');

    const handleMount: EditorDidMount = (editor) => {
        editor.focus();
    };

    // TODO: Requires language loading, see https://github.com/Microsoft/monaco-editor-webpack-plugin.
    //       Parcel v2 does not use Webpack, so this needs to be loaded otherwise.

    return (
        <MonacoEditor
            width="800"
            height="800"
            language="json"
            theme="vs-dark"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            editorDidMount={handleMount}
        />
    );
};
