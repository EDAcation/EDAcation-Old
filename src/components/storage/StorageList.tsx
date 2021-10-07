import {Box, Text} from '@primer/components';
import React, {useContext} from 'react';

import {storageByType, Storage, StorageType} from '../../storage';
import {StateContext} from '../state/StateContext';

import {AddStorageButton} from './AddStorageButton';
import {StorageListItem} from './StorageListItem';

export const StorageList: React.FC = () => {
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

    const handleRemove = async (storage: Storage<unknown, unknown>) => {
        await updateState({
            editor: {
                ...state.editor,
                files: state.editor.files.filter((f) => f.storage !== storage)
            },
            storages: state.storages.filter((s) => s !== storage)
        });
    };

    return (
        <>
            {state.storages.length === 0 && (
                <Box px={1} py={2}>
                    <Text display="block" mb={1}>No storage providers available.</Text>

                    {Object.values(StorageType).map((type) => (
                        <AddStorageButton key={type} storageType={type} onClick={handleAdd.bind(this, type)} />
                    ))}
                </Box>
            )}

            {state.storages.map((storage) => <StorageListItem key={storage.getType()} storage={storage} onRemove={handleRemove} />)}
        </>
    );
};
