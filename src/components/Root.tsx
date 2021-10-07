import {BaseStyles, ThemeProvider} from '@primer/components';
import React from 'react';

import {App} from './app/App';
import {StateProvider} from './state/StateContext';

export const Root = () => {
    return (
        <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
            <BaseStyles>
                <StateProvider>
                    <App />
                </StateProvider>
            </BaseStyles>
        </ThemeProvider>
    );
};
