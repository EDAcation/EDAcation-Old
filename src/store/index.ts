import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';

import {storagesSlice} from './storages';

export const store = configureStore({
    reducer: {
        storages: storagesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppState = () => [useSelector<RootState, RootState>((state) => state), useDispatch<AppDispatch>()];
export const useAppDispatch = () => useDispatch<AppDispatch>();
