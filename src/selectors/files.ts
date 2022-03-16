import {createSelector} from '@reduxjs/toolkit';

import {StorageFile} from '../storage';
import {RootState} from '../store';

export const selectFiles = (state: RootState) => state.files;

export const selectFilesById = createSelector(
    [
        selectFiles,
        (_, fileIds: string[]) => fileIds
    ],
    (files, fileIds) => files.filter((file) => fileIds.includes(file.id))
);

export const selectFileForStorageFile = createSelector(
    [
        selectFiles,
        (_, storageFile: StorageFile<unknown, unknown>) => storageFile
    ],
    (files, storageFile) => files.find((f) => [f.storageId].concat(f.path).join('/') === storageFile.getFullPath())
);
