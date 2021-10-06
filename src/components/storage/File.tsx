import React from 'react';

import {StorageFile} from '../../storage';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    return (
        <>
            {file.name}
        </>
    );
};
