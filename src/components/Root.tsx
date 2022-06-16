import {BaseStyles, Spinner, ThemeProvider} from '@primer/react';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '../store';
import {updateStorage} from '../store/storages';

import {App} from './app/App';

export const Root = () => {
    const handleLift = () => {
        const state = store.getState();

        for (const storage of state.storages) {
            store.dispatch(updateStorage(storage));
        }
    };

    return (
        <Provider store={store}>
            <PersistGate loading={<Spinner />} persistor={persistor} onBeforeLift={handleLift}>
                <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
                    <BaseStyles>
                        <App />
                    </BaseStyles>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};
