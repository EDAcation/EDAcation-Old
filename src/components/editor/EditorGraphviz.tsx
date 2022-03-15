import React, {useEffect} from 'react';
import {graphviz} from 'd3-graphviz';

import {BaseEditorProps} from './BaseEditor';

export type EditorGraphvizProps = BaseEditorProps;

export const EditorGraphviz: React.FC<EditorGraphvizProps> = ({panelId, file}) => {
    useEffect(() => {
        graphviz(`#graphviz-${panelId}-${file.id}`, {
            useWorker: true,
            width: 1000,
            height: 1000
        }).renderDot(file.content);
    }, [panelId, file.id, file.content]);

    return (
        <div id={`graphviz-${panelId}-${file.id}`} />
    );
};
