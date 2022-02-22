import React from 'react';
import {Graphviz} from 'graphviz-react';

import {BaseEditorProps} from './BaseEditor';

export type EditorGraphvizProps = BaseEditorProps;

export const EditorGraphviz: React.FC<EditorGraphvizProps> = ({file}) => {
    return (
        <Graphviz dot={file.getContent()} options={{width: '100%', height: '100%', useWorker: false}} />
    );
};
