import {BaseStyles, ThemeProvider} from '@primer/components';
import React from 'react';

import {App} from './app/App';

export const Root = () => {
    return (
        <ThemeProvider colorMode="night">
            <BaseStyles>
                <App />
            </BaseStyles>
        </ThemeProvider>
    );
};
