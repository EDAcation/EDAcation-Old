import {StyledOcticon, Text} from '@primer/react';
import {FileIcon} from '@primer/octicons-react';
import React from 'react';
import {v4 as uuidv4} from 'uuid';

import {StorageFile} from '../../storage';
import {useAppDispatch} from '../../store';
import {addFile} from '../../store/files';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const id = uuidv4();

        dispatch(addFile({
            id,
            storage: file.getStorage(),
            path: file.getPath(),
            file,
            isSaved: true
        }));

        // TODO: open file ID
        // await updateState({
        //     editor: {
        //         ...state.editor,
        //         files: [
        //             ...state.editor.files,
        //             {
        //                 id,
        //                 storage: file.getStorage(),
        //                 path: file.getPath(),
        //                 file,
        //                 isSaved: true
        //             }
        //         ],
        //         openFileId: id
        //     }
        // });
    };

    return (
        <Text style={{cursor: 'pointer', userSelect: 'none'}} onClick={handleClick}>
            <StyledOcticon icon={FileIcon} sx={{mr: 1}} />
            {file.getName()}
        </Text>
    );
};
