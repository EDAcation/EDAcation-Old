import {Action, Reducer} from '@reduxjs/toolkit';
import {get, set, del} from 'idb-keyval';
import {createTransform, persistReducer, persistStore} from 'redux-persist';

import {serializeState, deserializeState} from '../serializable';

const transform = createTransform<unknown, unknown>(
    (inboundState, key) => {
        console.log('in', key, inboundState);
        return serializeState(inboundState);
    },
    (outboundState, key) => {
        console.log('out', key, outboundState);
        return deserializeState(outboundState);
    },
    {
        blacklist: ['_persist']
    }
);

export const createPersistReducer = <S, A extends Action>(reducer: Reducer<S, A>) => persistReducer<S, A>({
    key: 'root',
    storage: {
        getItem: (key) => get(key),
        setItem: (key, value) => set(key, value),
        removeItem: (key) => del(key)
    },
    transforms: [transform],
    serialize: false,
    // @ts-expect-error: deserialize does not exist on the PersistConfig type, but should
    deserialize: false
}, reducer);

export const createPersistor = persistStore;
