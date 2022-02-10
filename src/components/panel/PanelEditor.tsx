import React from 'react';

import {useAppSelector} from '../../store';
import {PanelEditor as PanelEditorType} from '../../store/panels';
import {Editor} from '../editor/Editor';
import {Tabs} from '../tabs/Tabs';

import {BasePanelProps} from './BasePanel';

export const PanelEditor: React.FC<BasePanelProps<PanelEditorType>> = ({panel}) => {
    const files = useAppSelector((state) => state.files.filter((file) => panel.fileIds.includes(file.getID())));

    return (
        <>
            <Tabs panelId={panel.id} files={files} currentFileId={panel.currentFileId} />
            <Editor files={files} currentFileId={panel.currentFileId} />
        </>
    );
};
