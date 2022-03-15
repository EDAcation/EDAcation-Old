import {ActionMenu, StyledOcticon, Text} from '@primer/react';
import {FileIcon} from '@primer/octicons-react';
import React, {useState} from 'react';

import {StorageFile} from '../../storage';
import {useAppDispatch} from '../../store';
import {openFile} from '../../store/panels';
import {RightClickAnchor} from '../anchor/RightClickAnchor';

import {Actions} from './Actions';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const [isActionsOpen, setIsActionsOpen] = useState(false);

    const open = async () => {
        dispatch(openFile({
            file
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
                <Actions entry={file} />
            </ActionMenu.Overlay>
        </ActionMenu>
    );
};
