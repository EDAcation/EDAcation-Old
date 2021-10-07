import React, {useContext, useEffect} from 'react';

import {EditorFile} from '../../state';
import {StorageError} from '../../storage';
import {StateContext} from '../state/StateContext';

import {EditorMonaco} from './EditorMonoca';

export const Editor: React.FC = () => {
    const [state, updateState] = useContext(StateContext);

    // Open files when needed
    useEffect(() => {
        (async () => {
            // Check if any files need to be loaded
            if (state.editor.files.some((file) => !file.file || !file.content)) {
                const files: EditorFile[] = [];
                let shouldUpdate = false;

                // Loop over open files
                for (const file of state.editor.files) {
                    if (!file.file) {
                        // Check if the storage has permission, otherwise wait
                        if (!await file.storage.hasPermission()) {
                            files.push(file);
                            continue;
                        }

                        try {
                            // Find file in storage
                            file.file = await file.storage.getEntry(file.path);
                        } catch (err) {
                            if (err instanceof StorageError) {
                                // This file no longer exists, so don't add the file back to the list
                                console.error(err);
                                shouldUpdate = true;
                                continue;
                            }
                            throw err;
                        }
                    }

                    if (!file.content) {
                        // Read file from storage
                        files.push({
                            ...file,
                            content: await file.file?.read()
                        });
                        shouldUpdate = true;
                    } else {
                        files.push(file);
                    }
                }

                if (shouldUpdate) {
                    await updateState({
                        editor: {
                            ...state.editor,
                            files
                        }
                    });
                }

            }
        })();
    }, [state.editor.files, state.storages]);

    const file = state.editor.files.length > 0 ? state.editor.files[state.editor.files.length - 1] : null;

    if (!file || !file.content) {
        return <></>;
    }

    return (
        <EditorMonaco file={file} />
    );
};
