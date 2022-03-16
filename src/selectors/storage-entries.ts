import {createSelector} from '@reduxjs/toolkit';

import {StorageDirectory, StorageEntry} from '../storage';
import {RootState} from '../store';

export const selectStorageEntries = (state: RootState) => state.storageEntries;

export const selectStorageEntriesForDirectory = createSelector(
    [
        selectStorageEntries,
        (_, directory: StorageDirectory<unknown, unknown>) => directory
    ],
    (storageEntries, directory) => storageEntries[directory.getFullPath()] as (StorageEntry<unknown, unknown>[] | undefined)
);
