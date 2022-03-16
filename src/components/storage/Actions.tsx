import {ActionList, ActionListProps} from '@primer/react';
import {PayloadAction} from '@reduxjs/toolkit';
import React, {Fragment} from 'react';

import {StorageDirectory, StorageEntry, StorageEntryType, StorageFile} from '../../storage';
import {AppDispatch, useAppDispatch} from '../../store';
import {openFile} from '../../store/panels';
import {openPopup} from '../../store/popups';
import {deleteStorageEntry} from '../../store/storage-entries';

export interface Action {
    name: string;
    visible?: boolean | ((entry: StorageEntry<unknown, unknown>) => boolean);
    disabled?: boolean | ((entry: StorageEntry<unknown, unknown>) => boolean);
    executeEntry?: (entry: StorageEntry<unknown, unknown>, dispatch: AppDispatch) => void;
    executeDirectory?: (directory: StorageDirectory<unknown, unknown>, dispatch: AppDispatch) => void;
    executeFile?: (file: StorageFile<unknown, unknown>, dispatch: AppDispatch) => void;
}

export const ACTIONS: Action[][] = [
    [{
        name: 'New File',
        visible: (entry) => entry.getType() === StorageEntryType.DIRECTORY,
        executeDirectory(_directory, dispatch) {
            dispatch(openPopup({
                title: 'New File',
                form: [{
                    name: 'name',
                    label: 'File Name'
                }],
                actions: [{
                    label: 'Cancel',
                    type: 'close',
                    color: 'normal'
                }, {
                    label: 'Create File',
                    type: 'submit',
                    color: 'primary'
                }]
            }));
        }
    }, {
        name: 'New Folder',
        visible: (entry) => entry.getType() === StorageEntryType.DIRECTORY,
        executeDirectory(_directory, dispatch) {
            dispatch(openPopup({
                title: 'New Folder',
                form: [{
                    name: 'name',
                    label: 'Folder Name'
                }],
                actions: [{
                    label: 'Cancel',
                    type: 'close',
                    color: 'normal'
                }, {
                    label: 'Create Folder',
                    type: 'submit',
                    color: 'primary'
                }]
            }));
        }
    }],
    [{
        name: 'Open to the Side',
        visible: (entry) => entry.getType() === StorageEntryType.FILE,
        executeFile(file, dispatch) {
            dispatch(openFile({
                file,
                split: true
            }));
        }
    }],
    [{
        name: 'Rename',
        disabled: true,
        executeEntry() {
            // TODO
        }
    }, {
        name: 'Delete',
        disabled: (entry) => entry.getParent() === null,
        executeEntry(entry, dispatch) {
            dispatch(openPopup({
                title: 'Delete',
                content: `Are you sure you want to delete "${entry.getName()}"?`,
                actions: [{
                    label: 'Cancel',
                    type: 'close',
                    color: 'normal'
                }, {
                    label: 'Delete',
                    type: 'submit',
                    color: 'danger'
                }],
                async onSubmit() {
                    const result = await dispatch(deleteStorageEntry(entry));
                    handleResult(dispatch, result);
                }
            }));
        }
    }]
];

const handleResult = (dispatch: AppDispatch, result: PayloadAction<unknown, string, {requestStatus: 'fulfilled' | 'rejected'}>) => {
    if (result.meta.requestStatus === 'rejected') {
        // @ts-expect-error: error does not exist on PayloadAction
        const error = result.error;

        dispatch(openPopup({
            title: 'Error',
            content: error && error.message ? error.message : 'Unknown error',
            actions: [{
                label: 'Ok',
                type: 'close',
                color: 'normal'
            }]
        }));
    }
};

export interface ActionsProps extends ActionListProps {
    entry: StorageEntry<unknown, unknown>;
}

export const Actions: React.FC<ActionsProps> = ({entry, ...props}) => {
    const dispatch = useAppDispatch();

    const handleClick = (action: Action) => {
        if (action.executeEntry) {
            action.executeEntry(entry, dispatch);
        }
        if (action.executeDirectory && entry instanceof StorageDirectory) {
            action.executeDirectory(entry, dispatch);
        }
        if (action.executeFile && entry instanceof StorageFile) {
            action.executeFile(entry, dispatch);
        }
    };

    const filteredActions = ACTIONS
        .map((actions) =>
            actions.filter((action) =>
                action.visible === undefined || (typeof action.visible === 'boolean' ? action.visible : action.visible(entry))
            )
        ).filter((actions) => actions.length > 0);

    // TODO: ActionMenu not closing on item click

    return (
        <ActionList {...props}>
            {filteredActions.map((actions, index) => (
                <Fragment key={index}>
                    {actions.map((action, index) => (
                        <ActionList.Item
                            key={index}
                            disabled={typeof action.disabled === 'boolean' || action.disabled === undefined ? action.disabled : action.disabled(entry)}
                            onClick={handleClick.bind(this, action)}
                        >
                            {action.name}
                        </ActionList.Item>
                    ))}

                    {(index < filteredActions.length - 1) && <ActionList.Divider />}
                </Fragment>
            ))}
        </ActionList>
    );
};
