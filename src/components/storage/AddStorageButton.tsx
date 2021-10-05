import {Button, ButtonProps} from '@primer/components';
import React from 'react';

import {storageByType, StorageType} from '../../storage';

export interface AddStorageButtonProps extends ButtonProps {
    storageType: StorageType;
}

export const AddStorageButton: React.FC<AddStorageButtonProps> = ({storageType, ...props}) => {
    const storage = storageByType[storageType];

    return (
        <Button {...props}>{storage.getAddText()}</Button>
    );
};
