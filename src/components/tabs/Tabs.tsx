import {ButtonClose, TabNav, Text} from '@primer/components';
import React, {MouseEvent, useContext} from 'react';

import {EditorFile} from '../../state';
import {StateContext} from '../state/StateContext';

export const Tabs: React.FC = () => {
    const [state, updateState] = useContext(StateContext);

    // TODO: https://github.com/atlassian/react-beautiful-dnd

    const handleClick = async (file: EditorFile) => {
        await updateState({
            editor: {
                ...state.editor,
                openFileId: file.id
            }
        });
    };

    const handleClose = async (file: EditorFile, index: number, event: MouseEvent) => {
        event.stopPropagation();

        if (!file.isSaved) {
            // TODO: replace with Primer React popup

            if (!window.confirm('You have unsaved changes. Are you sure you want to close this file?')) {
                return;
            }
        }

        const files = state.editor.files.filter((f) => f.id !== file.id);

        await updateState({
            editor: {
                ...state.editor,
                files,
                openFileId: state.editor.openFileId === file.id ? file.id : files[Math.min(Math.max(0, index - 1), files.length - 1)].id
            }
        });
    };

    return (
        <TabNav>
            {state.editor.files.map((file, index) => (
                <TabNav.Link
                    key={index}
                    selected={file.id === state.editor.openFileId}
                    onClick={handleClick.bind(this, file)}
                    style={{cursor: 'pointer', userSelect: 'none'}}
                >
                    <Text>
                        {file.path[file.path.length - 1]}
                        {!file.isSaved && ' ⏺'}
                    </Text>

                    <ButtonClose pl={1} onClick={handleClose.bind(this, file, index)} />
                </TabNav.Link>
            ))}
        </TabNav>
    );
};
