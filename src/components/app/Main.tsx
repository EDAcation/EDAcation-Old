import {Box} from '@primer/components';
import React from 'react';

import {EditorMonaco} from '../editor/EditorMonoca';
import {FileBrowser} from '../storage/StorageList';

export const Main = () => {
    return (
        <main>
            <Box height="100%" display="grid" gridTemplateColumns="1fr 3fr" backgroundColor="black">
                <Box>
                    <FileBrowser />
                </Box>
                <Box>
                    <EditorMonaco />
                </Box>
            </Box>
        </main>
    );
};
