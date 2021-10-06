import {Box, Button, Heading, Spinner} from '@primer/components';
import React, {useEffect, useState} from 'react';

import {Storage, StorageDirectory} from '../../storage';

import {Directory} from './Directory';

export interface StorageProps {
    storage: Storage<unknown, unknown>;
}

export const StorageListItem: React.FC<StorageProps> = ({storage}) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [root, setRoot] = useState<StorageDirectory<unknown, unknown> | undefined>(undefined);

    useEffect(() => {
        (async () => {
            setHasPermission(await storage.hasPermission());
            setRoot(await storage.getRoot());
        })();
    }, [hasPermission]);

    const handlePermissionClick = async () => {
        setHasPermission(await storage.requestPermission());
    };

    return (
        <>
            <Box px={1}>
                <Heading fontSize={2} p={1}>
                    {storage.getName()}
                    {root && ` (${root.name})`}
                </Heading>

                {!hasPermission && <Button onClick={handlePermissionClick}>Grant permission</Button>}
                {hasPermission && !root && <Spinner />}
            </Box>

            {hasPermission && root && <Directory directory={root} />}
        </>
    );
};
