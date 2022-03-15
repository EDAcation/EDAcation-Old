import {ActionList, ActionListProps} from '@primer/react';
import React, {Fragment} from 'react';

import {StorageDirectory, StorageEntry, StorageEntryType, StorageFile} from '../../storage';
import {AppDispatch, useAppDispatch} from '../../store';
import {openFile} from '../../store/panels';

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
        name: 'Open to the Side',
        visible: (entry) => entry.getType() === StorageEntryType.FILE,
        executeFile: (file, dispatch) => {
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
        executeEntry() {
            // TODO
        }
    }]
];

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

    console.log(filteredActions);

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
