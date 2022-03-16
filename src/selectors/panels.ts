import {createSelector} from '@reduxjs/toolkit';

import {StorageFile} from '../storage';
import {RootState} from '../store';
import {findPanelByFileId} from '../store/panels';

import {selectFileForStorageFile} from './files';

const selectPanels = (state: RootState) => state.panels;

export const selectPanelForStorageFile = createSelector(
    [
        selectPanels,
        (state, storageFile: StorageFile<unknown, unknown>) => selectFileForStorageFile(state, storageFile)
    ],
    (panels, file) => {
        return file && findPanelByFileId(panels, file.id);
    }
);
