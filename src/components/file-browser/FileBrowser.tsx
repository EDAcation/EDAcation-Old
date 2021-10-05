import {Box} from '@primer/components';
import React, {useContext} from 'react';

import {storageByType, StorageType} from '../../storage';
import {StateContext} from '../state/StateContext';
import {AddStorageButton} from '../storage/AddStorageButton';

export const FileBrowser: React.FC = () => {
    const [state, updateState] = useContext(StateContext);

    const handleAdd = async (type: StorageType) => {
        const storage = new storageByType[type]();
        await storage.selectDirectory();

        updateState({
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
                <Box p={2}>
                    No storage providers available.

                    {Object.values(StorageType).map((type) => (
                        <AddStorageButton storageType={type} onClick={handleAdd.bind(this, type)} />
                    ))}
                </Box>
            )}

            {state.storages.map((storage) => (
                <>
                    {storage.getName()}
                </>
            ))}
        </>
    );
};
