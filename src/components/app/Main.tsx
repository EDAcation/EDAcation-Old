import {Box} from '@primer/react';
/* eslint-disable-next-line */
import {Allotment} from 'allotment';
import React from 'react';

import {Panel, PanelType} from '../panel/Panel';
import {StorageList} from '../storage/StorageList';

export const Main = () => {
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

                        <Panel type={PanelType.EDITOR} />
                    </Allotment.Pane>
                </Allotment>
            </Box>
        </main>
    );
};
