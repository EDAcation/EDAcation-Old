import {Box, Text} from '@primer/components';
import React, {useContext} from 'react';

import {storageByType, StorageType} from '../../storage';
import {StateContext} from '../state/StateContext';

import {AddStorageButton} from './AddStorageButton';
import {StorageListItem} from './StorageListItem';

export const FileBrowser: React.FC = () => {
    const [state, updateState] = useContext(StateContext);

    const handleAdd = async (type: StorageType) => {
        const storage = new storageByType[type]();
        await storage.add();

        await updateState({
            storages: [
                ...state.storages,
                storage
            ]
        });
    };

    console.log(state.storages);

    return (
        <>
            {state.storages.length === 0 && (
                <Box px={1} py={2}>
                    <Text display="block" mb={1}>No storage providers available.</Text>

                    {Object.values(StorageType).map((type) => (
                        <AddStorageButton storageType={type} onClick={handleAdd.bind(this, type)} />
                    ))}
                </Box>
            )}

            {state.storages.map((storage) => <StorageListItem key={storage.getType()} storage={storage} />)}
        </>
    );
};
