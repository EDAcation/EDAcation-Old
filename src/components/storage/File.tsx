import {ActionList, ActionMenu, StyledOcticon, Text} from '@primer/react';
import {FileIcon} from '@primer/octicons-react';
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import {StorageFile} from '../../storage';
import {useAppDispatch} from '../../store';
import {addFile} from '../../store/files';
import {openFile} from '../../store/panels';
import {RightClickAnchor} from '../anchor/RightClickAnchor';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const [isActionsOpen, setIsActionsOpen] = useState(false);

    const open = async () => {
        // Add the file
        const id = uuidv4();
        dispatch(addFile({
            id,
            file
        }));

        // Open the file in an editor
        dispatch(openFile({
            fileId: id
        }));
    };

    const handleClick: React.MouseEventHandler = async () => {
        if (isActionsOpen) {
            setIsActionsOpen(false);
            return;
        }

        open();
    };

    const handleKeyDown: React.KeyboardEventHandler = (event) => {
        if (event.defaultPrevented || isActionsOpen) {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case ' ': {
                // Ignore keys
                break;
            }
            case 'ArrowUp': {
                // TODO: select previous item in tree
                break;
            }
            case 'ArrowDown': {
                // TODO: select next item in tree
                break;
            }
            case 'Enter': {
                open();
                break;
            }
            case 'ContextMenu': {
                setIsActionsOpen(!isActionsOpen);
                break;
            }
            default: {
                // Not a known key binding, so don't call prevent default
                return;
            }
        }

        event.preventDefault();
    };

    return (
        <ActionMenu open={isActionsOpen} onOpenChange={(open) => setIsActionsOpen(open)}>
            <ActionMenu.Anchor>
                <RightClickAnchor childProps={{onKeyDown: handleKeyDown}}>
                    <Text onClick={handleClick} style={{cursor: 'pointer', userSelect: 'none'}}>
                        <StyledOcticon icon={FileIcon} sx={{mr: 1}} />
                        {file.getName()}
                    </Text>
                </RightClickAnchor>
            </ActionMenu.Anchor>

            <ActionMenu.Overlay>
                <ActionList>
                    <ActionList.Item>Open to the Side</ActionList.Item>
                    <ActionList.Divider></ActionList.Divider>
                    <ActionList.Item>Rename</ActionList.Item>
                    <ActionList.Item>Delete</ActionList.Item>
                </ActionList>
            </ActionMenu.Overlay>
        </ActionMenu>
    );
};
