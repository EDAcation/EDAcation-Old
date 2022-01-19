import {Box, Spinner} from '@primer/react';
import React, {useContext} from 'react';
// @ts-expect-error: Outdated type declaration
import {SplitPane, Pane} from '@deviousm/react-split-pane';

import {Editor} from '../editor/Editor';
import {StorageList} from '../storage/StorageList';
import {StateContext} from '../state/StateContext';
import {Tabs} from '../tabs/Tabs';

export const Main = () => {
    const [state] = useContext(StateContext);

    // TODO: replace react-split-pane with an up-to-date library

    return (
        <main style={{height: 'calc(100vh - 3rem)'}}>
            <Box height="100%" backgroundColor="canvas.default">
                {state.loading && <Spinner />}

                {!state.loading && (
                    <SplitPane split="vertical">
                        <Pane minSize="5%" initialSize="20%">
                            <Box height="100%" overflowY="auto">
                                <StorageList />
                            </Box>
                        </Pane>
                        <Pane minSize="5%">
                            <Tabs />
                            <Editor />
                        </Pane>
                    </SplitPane>
                )}
            </Box>
        </main>
    );
};
