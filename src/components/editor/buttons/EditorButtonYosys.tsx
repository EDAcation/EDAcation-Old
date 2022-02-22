import {Button} from '@primer/react';
import React from 'react';

import {EditorFile} from '../../../state';
import {StorageFile} from '../../../storage';
import {useAppDispatch} from '../../../store';
import {addFile} from '../../../store/files';
import {openFile} from '../../../store/panels';
import {synthesize} from '../../../tools/yosys';

import {BaseEditorButtonProps} from './BaseEditorButton';

export const EditorButtonYosys: React.FC<BaseEditorButtonProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const result = await synthesize(file);
        console.log(file, result);

        const directory = file.getStorageFile()?.getParent();
        if (!directory) {
            throw new Error('Missing storage file or parent directory.');
        }

        const resultDirectory = await directory.createDirectory(file.getName());
        const resultEntry = await resultDirectory.getEntry('rtl.dot', true);
        // TODO: check if file is not a directory
        let resultFile = resultEntry as StorageFile<unknown, unknown>;
        if (!resultEntry) {
            resultFile = await resultDirectory.createFile('rtl.dot');
        }

        await resultFile.write(result);

        const editorFile = new EditorFile(resultFile);
        dispatch(addFile(editorFile));
        dispatch(openFile({
            fileId: editorFile.getID(),
            split: true
        }));
    };

    return (
        <Button onClick={handleClick}>
            Synthesize with Yosys
        </Button>
    );
};
