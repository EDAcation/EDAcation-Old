import {Box, Button, ButtonClose, Heading, Spinner} from '@primer/components';
import React, {useEffect, useState} from 'react';

import {Storage, StorageDirectory} from '../../storage';

import {Directory} from './Directory';

export interface StorageProps {
    storage: Storage<unknown, unknown>;
    onRemove?: (storage: Storage<unknown, unknown>) => void;
}

export const StorageListItem: React.FC<StorageProps> = ({storage, onRemove}) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [root, setRoot] = useState<StorageDirectory<unknown, unknown> | undefined>(undefined);

    useEffect(() => {
        (async () => {
            setHasPermission(await storage.hasPermission());
            setRoot(await storage.getRoot());
        })();
    }, [storage, hasPermission, setHasPermission, setRoot]);

    const handlePermissionClick = async () => {
        const result = await storage.requestPermission();
        setHasPermission(result);

        if (result) {
            // Force state update for storages
            // TODO: deal with this if necessary
            // await updateState({
            //     storages: [...state.storages]
            // });
        }
    };

    const handleRemoveClick = () => {
        if (onRemove) {
            onRemove(storage);
        }
    };

    return (
        <>
            <Box px={1}>
                <Box as={Heading} fontSize={2} p={1} display="flex" justifyContent="space-between" alignItems="center">
                    <span>
                        {storage.getName()}
                        {root && ` (${root.getName()})`}
                    </span>

                    <ButtonClose onClick={handleRemoveClick} />
                </Box>

                {!hasPermission && <Button onClick={handlePermissionClick}>Grant permission</Button>}
                {hasPermission && !root && <Spinner />}
            </Box>

            {hasPermission && root && <Directory directory={root} />}
        </>
    );
};
