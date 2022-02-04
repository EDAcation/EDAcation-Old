import {BaseStyles, Spinner, ThemeProvider} from '@primer/react';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '../store';

import {App} from './app/App';
import {StateProvider} from './state/StateContext';

export const Root = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Spinner />} persistor={persistor}>
                <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
                    <BaseStyles>
                        <StateProvider>
                            <App />
                        </StateProvider>
                    </BaseStyles>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};
