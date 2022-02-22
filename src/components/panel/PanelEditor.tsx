import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../store';
import {PanelEditor as PanelEditorType, removePanel} from '../../store/panels';
import {Editor} from '../editor/Editor';
import {Tabs} from '../tabs/Tabs';

import {BasePanelProps} from './BasePanel';

export const PanelEditor: React.FC<BasePanelProps<PanelEditorType>> = ({panel}) => {
    const dispatch = useAppDispatch();
    const files = useAppSelector((state) => state.files.filter((file) => panel.fileIds.includes(file.getID())));

    useEffect(() => {
        if (files.length === 0) {
            dispatch(removePanel(panel));
        }
    }, [dispatch, files, panel]);

    return (
        <>
            <Tabs panelId={panel.id} files={files} currentFileId={panel.currentFileId} />

            <Editor files={files} currentFileId={panel.currentFileId} />
        </>
    );
};
