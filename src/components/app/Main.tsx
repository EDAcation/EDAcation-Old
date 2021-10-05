import {Box} from '@primer/components';
import React from 'react';

import {EditorMonaco} from '../editor/EditorMonoca';
import {FileBrowser} from '../file-browser/FileBrowser';

export const Main = () => {
    return (
        <main>
            <Box height="100%" display="grid" gridTemplateColumns="1fr 3fr">
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
