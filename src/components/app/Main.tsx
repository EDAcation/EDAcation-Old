import {Box} from '@primer/react';
/* eslint-disable-next-line */
import {Allotment} from 'allotment';
import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../store';
import {accessFile, loadFile} from '../../store/files';
import {Panel} from '../panel/Panel';
import {StorageList} from '../storage/StorageList';

export const Main = () => {
    const dispatch = useAppDispatch();
    const files = useAppSelector((state) => state.files);
    const panel = useAppSelector((state) => state.panels);

    // Open files when needed
    useEffect(() => {
        (async () => {
            // Loop over open files
            for (const file of files) {
                if (!file.isAccessible) {
                    await dispatch(accessFile(file));
                    continue;
                }

                if (!file.isLoaded) {
                    await dispatch(loadFile(file));
                    continue;
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
