import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

import {storagesSlice} from './storages';
import {filesSlice} from './files';
import {createPersistor, createPersistReducer} from './persist';

const rootReducer = createPersistReducer(combineReducers({
    storages: storagesSlice.reducer,
    files: filesSlice.reducer
}));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ['storages']
        },
        serializableCheck: {
            // Ignore redux-persist actions
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]

            // TODO: fix serialiability warnings by ignoring stuff here
        }
    })
});

export const persistor = createPersistor(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
