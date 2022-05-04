import {Box, Spinner, Text} from '@primer/react';
import React, {useCallback} from 'react';

import {useAppDispatch} from '../../store';
import {saveFile, changeFile, EditorFile, EditorFileLoaded} from '../../store/files';
import {changeFileEditor, PanelEditorFile} from '../../store/panels';

import {EditorButtonYosys} from './buttons/EditorButtonYosys';
import {EditorButtonNextpnr} from './buttons/EditorButtonNextpnr';
import {EditorDefinition, getEditors} from './editors';
import {EditorMenu} from './EditorMenu';

export interface EditorProps {
    panelId: string;
    currentFileId: string;
    files: EditorFile[];
    fileInfos: PanelEditorFile[];
}

export const Editor: React.FC<EditorProps> = ({panelId, currentFileId, files, fileInfos}) => {
    const dispatch = useAppDispatch();

    const handleSave = useCallback(
        (file: EditorFile) => {
            // TODO: Will generate an error if the content on disk was changed by antoher program.
            //       This should error should trigger a Primer React popup, which asks for confirmation.
            dispatch(saveFile({file}));
        },
        [dispatch]
    );

    const handleChange = useCallback(
        (file: EditorFile, content: string) => {
            dispatch(changeFile({
                fileId: file.id,
                content
            }));
        },
        [dispatch]
    );

    const handleEditorChange = useCallback(
        (fileInfo: PanelEditorFile, editor: EditorDefinition) => {
            dispatch(changeFileEditor({
                panelId: panelId,
                fileId: fileInfo.id,
                editorId: editor.id
            }));
        },
        [panelId, dispatch]
    );

    const file = files.length > 0 ? files.find((file) => file.id === currentFileId) : null;
    const fileInfo = fileInfos.length > 0 ? fileInfos.find((file) => file.id === currentFileId) : null;

    if (!file || !fileInfo) {
        return <></>;
    }

    if (!file.isAccessible) {
        return (
            <Box p={2}>
                <Text>Grant permission to this file's storage provider to view the contents.</Text>
            </Box>
        );
    }

    if (!file.isLoaded) {
        return (
            <Box p={2}>
                <Spinner />
            </Box>
        );
    }

    const loadedFile = file as EditorFileLoaded;
    const extension = loadedFile.file.getExtension();

    // TODO: integrate editor buttons into this constructions
    const editors = getEditors(loadedFile);
    const editor = editors.find((editor) => editor.id === fileInfo.editorId) || editors[0] || editors.find((editor) => editor.isDefault) as EditorDefinition;
    const EditorComponent = editor && editor.component;

    return (
        <>
            {EditorComponent ? (
                <EditorComponent panelId={panelId} file={loadedFile} value={loadedFile.content} onChange={handleChange} onSave={handleSave} />
            ) : (
                <div>
                    No editors found.
                </div>
            )}

            <Box sx={{position: 'absolute', width: '100%', bottom: '0px', p: '2'}}>
                <EditorMenu editors={editors} selectedEditor={editor} fileInfo={fileInfo} onChange={handleEditorChange} />

                {extension === 'v' && <EditorButtonYosys panelId={panelId} file={loadedFile} />}
                {extension === 'json' && <EditorButtonNextpnr panelId={panelId} file={loadedFile} />}
            </Box>
        </>
    );
};
