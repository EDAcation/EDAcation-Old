import {ButtonClose, TabNav, Text} from '@primer/react';
import React, {MouseEvent} from 'react';

import {EditorFile} from '../../state';
import {useAppDispatch} from '../../store';
import {removeFile} from '../../store/files';
import {closeFile, viewFile} from '../../store/panels';

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
            fileId: file.getID(),
            panelId
        }));
    };

    const handleClose = async (file: EditorFile, index: number, event: MouseEvent) => {
        event.stopPropagation();

        if (!file.isSaved()) {
            // TODO: replace with Primer React popup

            if (!window.confirm('You have unsaved changes. Are you sure you want to close this file?')) {
                return;
            }
        }

        // TODO: remove file if this panel was the last that had it open
        // dispatch(removeFile(file));
        dispatch(closeFile({
            fileId: file.getID(),
            panelId
        }));
    };

    return (
        <TabNav>
            {files.map((file, index) => (
                <TabNav.Link
                    key={index}
                    selected={file.getID() === currentFileId}
                    onClick={handleClick.bind(this, file)}
                    style={{cursor: 'pointer', userSelect: 'none'}}
                >
                    <Text>
                        {file.getFullName()}
                        <small>{!file.isSaved() && ' ●'}</small>
                    </Text>

                    <ButtonClose sx={{pl: 1}} onClick={handleClose.bind(this, file, index)} />
                </TabNav.Link>
            ))}
        </TabNav>
    );
};
