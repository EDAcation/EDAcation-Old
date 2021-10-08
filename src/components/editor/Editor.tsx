import {Box, Spinner, Text} from '@primer/components';
import React, {useContext, useEffect, useMemo} from 'react';

import {EditorFile, EditorFileOpened} from '../../state';
import {StorageError} from '../../storage';
import {StateContext} from '../state/StateContext';

import {EditorMonaco} from './EditorMonoca';

export const Editor: React.FC = () => {
    const [state, updateState] = useContext(StateContext);

    // Open files when needed
    useEffect(() => {
        (async () => {
            // Check if any files need to be loaded
            if (state.editor.files.some((file) => !file.file || !file.originalContent)) {
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

                    if (!file.originalContent) {
                        // Read file from storage
                        const content = await file.file?.read();
                        files.push({
                            ...file,
                            originalContent: content,
                            content,
                            isSaved: true
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

    const handleFileUpdate = useMemo(() => async (file: EditorFileOpened, handler: () => Promise<EditorFileOpened>) => {
        const updatedFile = await handler();

        await updateState({
            editor: {
                ...state.editor,
                files: state.editor.files.map((f) => {
                    if (f.id === file.id) {
                        return updatedFile;
                    }
                    return f;
                })
            }
        });
    }, [updateState]);

    const handleSave = useMemo(() => (file: EditorFileOpened) => handleFileUpdate(file, async () => {
        // Read file from storage to check if it changed
        const currentContent = await file.file.read();
        if (currentContent !== file.originalContent) {
            // TODO: replace with Primer React popup

            if (!window.confirm('File content was changed by another program. Do you want to override the changes?')) {
                return {
                    ...file,
                    isSaved: file.content === currentContent
                };
            }
        }

        // Write file to storage
        await file.file.write(file.content);

        return {
            ...file,
            originalContent: file.content,
            content: file.content,
            isSaved: true
        };
    }), []);

    const handleChange = useMemo(() => (file: EditorFileOpened, newContent: string) => handleFileUpdate(file, async () => {
        return {
            ...file,
            content: newContent,
            isSaved: newContent === file.originalContent
        };
    }), []);

    const file = state.editor.files.length > 0 ? state.editor.files.find((file) => file.id === state.editor.openFileId) : null;

    if (!file) {
        return <></>;
    }

    if (!file.file) {
        return (
            <Box p={2}>
                <Text>Grant permission to this file's storage provider to view the contents.</Text>
            </Box>
        );
    }

    if (!file.originalContent || !file.content) {
        return (
            <Box p={2}>
                <Spinner />;
            </Box>
        );
    }

    const openedFile = file as EditorFileOpened;

    return (
        <EditorMonaco file={openedFile} value={openedFile.content} onChange={handleChange} onSave={handleSave} />
    );
};
