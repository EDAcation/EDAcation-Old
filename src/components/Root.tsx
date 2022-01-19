import {BaseStyles, ThemeProvider} from '@primer/react';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../store';

import {App} from './app/App';
import {StateProvider} from './state/StateContext';

export const Root = () => {
    return (
        <Provider store={store}>
            <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
                <BaseStyles>
                    <StateProvider>
                        <App />
                    </StateProvider>
                </BaseStyles>
            </ThemeProvider>
        </Provider>
    );
};
