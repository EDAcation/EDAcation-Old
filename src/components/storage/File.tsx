import {StyledOcticon, Text} from '@primer/react';
import {FileIcon} from '@primer/octicons-react';
import React from 'react';
import {v4 as uuidv4} from 'uuid';

import {StorageFile} from '../../storage';
import {useAppDispatch} from '../../store';
import {addFile} from '../../store/files';
import {openFile} from '../../store/panels';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
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

    return (
        <Text style={{cursor: 'pointer', userSelect: 'none'}} onClick={handleClick}>
            <StyledOcticon icon={FileIcon} sx={{mr: 1}} />
            {file.getName()}
        </Text>
    );
};
