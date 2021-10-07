import {ButtonClose, TabNav} from '@primer/components';
import React, {useContext} from 'react';

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

    const handleClose = async (file: EditorFile, index: number) => {
        const files = state.editor.files.filter((f) => f !== file);

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
                    {file.path[file.path.length - 1]}

                    <ButtonClose pl={1} onClick={handleClose.bind(this, file, index)} />
                </TabNav.Link>
            ))}
        </TabNav>
    );
};
