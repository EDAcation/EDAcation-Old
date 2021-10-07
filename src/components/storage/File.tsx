import {StyledOcticon, Text} from '@primer/components';
import {FileIcon} from '@primer/octicons-react';
import React, {useContext} from 'react';

import {StorageFile} from '../../storage';
import {StateContext} from '../state/StateContext';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    const [state, updateState] = useContext(StateContext);

    const handleClick = async () => {
        await updateState({
            editor: {
                ...state.editor,
                files: [
                    ...state.editor.files,
                    {
                        storage: file.getStorage(),
                        path: file.getPath(),
                        file
                    }
                ]
            }
        });
    };

    return (
        <Text style={{cursor: 'pointer', userSelect: 'none'}} onClick={handleClick}>
            <StyledOcticon icon={FileIcon} mr={1} />
            {file.getName()}
        </Text>
    );
};
