import {Box} from '@primer/react';
/* eslint-disable-next-line */
import {Allotment} from 'allotment';
import React, {useEffect} from 'react';

import {StorageError} from '../../storage';
import {useAppDispatch, useAppSelector} from '../../store';
import {loadFile, removeFile} from '../../store/files';
import {Panel} from '../panel/Panel';
import {StorageList} from '../storage/StorageList';

export const Main = () => {
    const dispatch = useAppDispatch();
    const files = useAppSelector((state) => state.files);
    const panel = useAppSelector((state) => state.panels);

    // Open files when needed
    useEffect(() => {
        (async () => {
            // Check if any files need to be loaded
            if (files.some((file) => !file.isLoaded)) {
                // Loop over open files
                for (const file of files) {
                    if (!file.isAccessible) {
                        // TODO: this should be done using dispatch(accessFile())
                        // Check if the storage has permission, otherwise wait
                        if (!await file.isAccessible()) {
                            continue;
                        }

                        try {
                            // Find file in storage
                            // file.file = await file.storage.getEntry(file.path);
                            await file.access();
                        } catch (err) {
                            if (err instanceof StorageError) {
                                // This file no longer exists, so don't add the file back to the list
                                console.error(err);

                                dispatch(removeFile(file));

                                continue;
                            }
                            throw err;
                        }
                    }

                    if (!file.isLoaded) {
                        // Read file from storage
                        // await file.load();

                        dispatch(loadFile(file));
                    }
                }
            }
        })();
    }, [files, dispatch]);

    return (
        <main style={{height: 'calc(100vh - 3rem)'}}>
            <Box height="100%" backgroundColor="canvas.default">
                <Allotment defaultSizes={[1, 5]} minSize={100}>
                    <Allotment.Pane>
                        <Box height="100%" overflowY="auto">
                            <StorageList />
                        </Box>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <Panel panel={panel} />
                    </Allotment.Pane>
                </Allotment>
            </Box>
        </main>
    );
};
