import {TabNav, Text} from '@primer/react';
import React, {MouseEvent} from 'react';

import {useAppDispatch} from '../../store';
import {EditorFile} from '../../store/files';
import {closeFile, viewFile} from '../../store/panels';
import {ButtonClose} from '../button/ButtonClose';

export interface TabsProps {
    panelId: string;
    files: EditorFile[];
    currentFileId: string;
}

export const Tabs: React.FC<TabsProps> = ({panelId, files, currentFileId}) => {
    const dispatch = useAppDispatch();

    // TODO: https://github.com/atlassian/react-beautiful-dnd

    const handleClick = async (file: EditorFile) => {
        dispatch(viewFile({
            fileId: file.id,
            panelId
        }));
    };

    const handleClose = async (file: EditorFile, _index: number, event: MouseEvent) => {
        event.stopPropagation();

        if (!file.isSaved) {
            // TODO: replace with Primer React popup

            if (!window.confirm('You have unsaved changes. Are you sure you want to close this file?')) {
                return;
            }
        }

        // TODO: remove file if this panel was the last that had it open
        // dispatch(removeFile(file));
        dispatch(closeFile({
            fileId: file.id,
            panelId
        }));
    };

    return (
        <TabNav>
            {files.map((file, index) => (
                <TabNav.Link
                    key={index}
                    selected={file.id === currentFileId}
                    onClick={handleClick.bind(this, file)}
                    style={{cursor: 'pointer', userSelect: 'none'}}
                >
                    <Text>
                        {file.path[file.path.length - 1]}
                        <small>{!file.isSaved && ' ●'}</small>
                    </Text>

                    <ButtonClose sx={{pl: 1}} onClick={handleClose.bind(this, file, index)} />
                </TabNav.Link>
            ))}
        </TabNav>
    );
};
