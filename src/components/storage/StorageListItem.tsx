import {Box, Button, ButtonClose, Spinner} from '@primer/react';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Storage, StorageDirectory} from '../../storage';
import {useAppSelector} from '../../store';
import {accessFiles} from '../../store/files';

import {Directory} from './Directory';

export interface StorageProps {
    storage: Storage<unknown, unknown>;
    onRemove?: (storage: Storage<unknown, unknown>) => void;
}

export const StorageListItem: React.FC<StorageProps> = ({storage, onRemove}) => {
    const dispatch = useDispatch();
    const files = useAppSelector((state) => state.files);

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
            // Access files from this storage provider
            dispatch(accessFiles(files.filter((file) => file.storage.getID() === storage.getID())));
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
                <Box fontSize={2} fontWeight="bold" p={1} display="flex" justifyContent="space-between" alignItems="center">
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
