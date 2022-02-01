import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {get, set, del} from 'idb-keyval';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {createTransform, persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

import {storageByType, Storage, StorageType} from '../storage';

import {storagesSlice} from './storages';
import {filesSlice} from './files';

const rootReducer = combineReducers({
    storages: storagesSlice.reducer,
    files: filesSlice.reducer
});

interface ExporedStorage extends Record<string, unknown> {
    type: StorageType;
    id: string;
}

const TransformStorages = createTransform<Storage<unknown, unknown>[], ExporedStorage[]>(
    (inboundState) => {
        return inboundState.map((storage) => ({
            type: storage.getType(),
            id: storage.getID(),
            ...storage.serialize()
        }));
    },
    (outboundState) => {
        console.log(outboundState);
        return outboundState
            .map((data): Storage<unknown, unknown> | null => {
                if (!data.type || !storageByType[data.type]) {
                    return null;
                }

                const storage: Storage<unknown, unknown> = new storageByType[data.type](data.id);
                storage.deserialize(data);
                console.log(storage);
                return storage;
            })
            .filter((s): s is Storage<unknown, unknown> => s !== null);
    },
    {
        whitelist: ['storages']
    }
);

export const store = configureStore({
    reducer: persistReducer({
        key: 'root',
        storage: {
            getItem(key) {
                console.log('get', key);
                return get(key);
            },
            setItem(key, value) {
                console.log('set', key, value);
                return set(key, value);
            },
            removeItem(key) {
                console.log('del', key);
                return del(key);
            }
        },
        transforms: [TransformStorages],
        serialize: false,
        // @ts-expect-error: deserialize does not exist on the PersistConfig type, but should
        deserialize: false,
        whitelist: ['storages']
    }, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ['storages']
        },
        serializableCheck: {
            // Ignore redux-persist actions
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
