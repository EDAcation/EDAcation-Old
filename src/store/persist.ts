import {Action, Reducer} from '@reduxjs/toolkit';
import {get, set, del} from 'idb-keyval';
import {persistReducer, persistStore} from 'redux-persist';

import {serializeState, deserializeState} from '../serializable';

import {FilesTransform} from './files';

const DESERIALIZATION_ORDER = ['settings', 'storages', 'keys'];

export const createPersistReducer = <S, A extends Action>(reducer: Reducer<S, A>) => persistReducer<S, A>({
    key: 'root',
    storage: {
        getItem: (key) => get(key),
        setItem: (key, value) => set(key, value),
        removeItem: (key) => del(key)
    },
    // @ts-expect-error: PersistConfig type has incorrect types for serialize and deserialize
    serialize: (state: Record<string, unknown>) => {
        if (state._persist) {
            return serializeState(state);
        }
        return state;
    },
    deserialize: (data: Record<string, unknown>) => {
        if (data._persist) {
            const keys = Object.keys(data).sort((a, b) => {
                const indexA = DESERIALIZATION_ORDER.indexOf(a) || Infinity;
                const indexB = DESERIALIZATION_ORDER.indexOf(b) || Infinity;
                return indexA > indexB ? -1 : 1;
            });

            const state: Record<string, unknown> = {};
            for (const key of keys) {
                state[key] = deserializeState(data[key], state);
            }
            return state;
        }
        return data;
    },
    transforms: [
        FilesTransform
    ]
}, reducer);

export const createPersistor = persistStore;
