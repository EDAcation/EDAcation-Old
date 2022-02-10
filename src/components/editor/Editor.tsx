import {Box, Spinner, Text} from '@primer/react';
import React, {useEffect} from 'react';

import {EditorFile} from '../../state';
import {StorageError} from '../../storage';
import {useAppDispatch} from '../../store';
import {loadFile, saveFile, changeFile, removeFile} from '../../store/files';

import {EditorMonaco} from './EditorMonoca';

export interface EditorProps {
    files: EditorFile[];
    currentFileId: string;
}

export const Editor: React.FC<EditorProps> = ({files, currentFileId}) => {
    const dispatch = useAppDispatch();

    console.log(files);

    // TODO: this effect should probably be more global instead of having each editor handle its own file opening

    // Open files when needed
    useEffect(() => {
        (async () => {
            // Check if any files need to be loaded
            if (files.some((file) => !file.isLoaded())) {
                // Loop over open files
                for (const file of files) {
                    if (!file.isAvailable()) {
                        // Check if the storage has permission, otherwise wait
                        if (!await file.isAccessible()) {
                            continue;
                        }

                        try {
                            // Find file in storage
                            // file.file = await file.storage.getEntry(file.path);
                            await file.access();
                        } catch (err) {
                            if (err instanceof StorageError) {
                                // This file no longer exists, so don't add the file back to the list
                                console.error(err);

                                dispatch(removeFile(file));

                                continue;
                            }
                            throw err;
                        }
                    }

                    if (!file.isLoaded()) {
                        // Read file from storage
                        // await file.load();

                        dispatch(loadFile(file));
                    }
                }
            }
        })();
    }, [files, dispatch]);

    const handleSave = (file: EditorFile) => {
        // TODO: Will generate an error if the content on disk was changed by antoher program.
        //       This should error should trigger a Primer React popup, which asks for confirmation.
        dispatch(saveFile(file));
    };

    const handleChange = (file: EditorFile, content: string) => {
        dispatch(changeFile({
            file,
            content
        }));
    };

    const file = files.length > 0 ? files.find((file) => file.getID() === currentFileId) : null;

    if (!file) {
        return <></>;
    }

    if (!file.isAvailable()) {
        return (
            <Box p={2}>
                <Text>Grant permission to this file's storage provider to view the contents.</Text>
            </Box>
        );
    }

    if (!file.isLoaded()) {
        return (
            <Box p={2}>
                <Spinner />
            </Box>
        );
    }

    return (
        <EditorMonaco file={file} value={file.getContent()} onChange={handleChange} onSave={handleSave} />
    );
};
