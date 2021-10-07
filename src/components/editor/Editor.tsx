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
            // TODO: when no permission is available this keeps updating the files array, which should not happen

            if (state.editor.files.some((file) => !file.file || !file.content)) {
                const files: EditorFile[] = [];
                for (const file of state.editor.files) {
                    if (!file.file) {
                        if (!await file.storage.hasPermission()) {
                            files.push(file);
                            continue;
                        }

                        try {
                            file.file = await file.storage.getEntry(file.path);
                        } catch (err) {
                            if (err instanceof StorageError) {
                                // This file no longer exists, so don't add the file back to the list
                                console.error(err);
                                continue;
                            }
                            throw err;
                        }
                    }

                    if (!file.content) {
                        files.push({
                            ...file,
                            content: await file.file?.read()
                        });
                    } else {
                        files.push(file);
                    }
                }

                await updateState({
                    editor: {
                        ...state.editor,
                        files
                    }
                });

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
