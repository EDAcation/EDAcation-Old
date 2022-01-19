import {Box, Text} from '@primer/react';
import React from 'react';

import {storageByType, Storage, StorageType} from '../../storage';
import {useAppDispatch, useAppSelector} from '../../store';
import {addStorage, removeStorage} from '../../store/storages';

import {AddStorageButton} from './AddStorageButton';
import {StorageListItem} from './StorageListItem';

export const StorageList: React.FC = () => {
    const dispatch = useAppDispatch();
    const storages = useAppSelector((state) => state.storages);

    const handleAdd = async (type: StorageType) => {
        const storage = new storageByType[type]();
        await storage.add();

        dispatch(addStorage(storage));
    };

    const handleRemove = async (storage: Storage<unknown, unknown>) => {
        // TODO: removeStorage does not yet close files from this storage
        dispatch(removeStorage(storage));

        // await updateState({
        //     editor: {
        //         ...state.editor,
        //         files: state.editor.files.filter((f) => f.storage !== storage)
        //     },
        //     storages: state.storages.filter((s) => s !== storage)
        // });
    };

    return (
        <>
            {storages.length === 0 && (
                <Box px={1} py={2}>
                    <Text display="block" mb={1}>No storage providers available.</Text>

                    {Object.values(StorageType).map((type) => (
                        <AddStorageButton key={type} storageType={type} onClick={handleAdd.bind(this, type)} />
                    ))}
                </Box>
            )}

            {storages.map((storage) => <StorageListItem key={storage.getType()} storage={storage} onRemove={handleRemove} />)}
        </>
    );
};
