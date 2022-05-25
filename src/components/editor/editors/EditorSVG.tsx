import React from 'react';

import {BaseEditorProps} from './BaseEditor';

export type EditorSVGProps = BaseEditorProps;

export const EditorSVG: React.FC<EditorSVGProps> = ({panelId, file}) => {
    return (
        <div id={`svg-${panelId}-${file.id}`} dangerouslySetInnerHTML={{__html: file.content}} />
    );
};
