import React from 'react';

import {selectFilesById} from '../../selectors';
import {useAppSelector} from '../../store';
import {PanelEditor as PanelEditorType} from '../../store/panels';
import {Editor} from '../editor/Editor';
import {Tabs} from '../tabs/Tabs';

import {BasePanelProps} from './BasePanel';

export const PanelEditor: React.FC<BasePanelProps<PanelEditorType>> = ({panel}) => {
    const files = useAppSelector((state) => selectFilesById(state, panel.files.map((file) => file.id)));

    return (
        <>
            <Tabs panelId={panel.id} files={files} currentFileId={panel.currentFileId} />

            <Editor panelId={panel.id} files={files} fileInfos={panel.files} currentFileId={panel.currentFileId} />
        </>
    );
};
