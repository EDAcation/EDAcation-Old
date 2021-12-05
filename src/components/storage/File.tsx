import {StyledOcticon, Text} from '@primer/components';
import {FileIcon} from '@primer/octicons-react';
import React, {useContext} from 'react';
import {v4 as uuidv4} from 'uuid';

import {StorageFile} from '../../storage';
import {StateContext} from '../state/StateContext';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    const [state, updateState] = useContext(StateContext);

    const handleClick = async () => {
        const id = uuidv4();

        await updateState({
            editor: {
                ...state.editor,
                files: [
                    ...state.editor.files,
                    {
                        id,
                        storage: file.getStorage(),
                        path: file.getPath(),
                        file,
                        isSaved: true
                    }
                ],
                openFileId: id
            }
        });
    };

    return (
        <Text style={{cursor: 'pointer', userSelect: 'none'}} onClick={handleClick}>
            <StyledOcticon icon={FileIcon} sx={{mr: 1}} />
            {file.getName()}
        </Text>
    );
};
