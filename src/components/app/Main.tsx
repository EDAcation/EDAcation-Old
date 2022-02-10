import {Box} from '@primer/react';
/* eslint-disable-next-line */
import {Allotment} from 'allotment';
import React from 'react';

import {useAppSelector} from '../../store';
import {Panel} from '../panel/Panel';
import {StorageList} from '../storage/StorageList';

export const Main = () => {
    const panel = useAppSelector((state) => state.panels);

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
