import {StyledOcticon, Text} from '@primer/components';
import {FileIcon} from '@primer/octicons-react';
import React from 'react';

import {StorageFile} from '../../storage';

export interface FileProps {
    file: StorageFile<unknown, unknown>;
}

export const File: React.FC<FileProps> = ({file}) => {
    return (
        <Text>
            <StyledOcticon icon={FileIcon} mr={1} />
            {file.name}
        </Text>
    );
};
