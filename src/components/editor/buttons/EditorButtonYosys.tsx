import {Button} from '@primer/react';
import React from 'react';

import {StorageDirectory, StorageFile} from '../../../storage';
import {useAppDispatch} from '../../../store';
import {openFile} from '../../../store/panels';
import {synthesize} from '../../../tools/yosys';

import {BaseEditorButtonProps} from './BaseEditorButton';

export const EditorButtonYosys: React.FC<BaseEditorButtonProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const result = await synthesize(file);
        console.log(file, result);

        const directory = file.file.getParent();

        const resultDirectory = await directory.createDirectory(file.file.getNameWithoutExtension());
        const resultEntry = await resultDirectory.getEntry('rtl.dot', true);
        if (resultEntry instanceof StorageDirectory) {
            throw new Error(`Output file "${resultEntry.getFullPath()}" is already a directory.`);
        }

        // TODO: check if file is not a directory
        let resultFile = resultEntry as StorageFile<unknown, unknown>;
        if (!resultEntry) {
            resultFile = await resultDirectory.createFile('rtl.dot');
        }

        await resultFile.write(result);

        dispatch(openFile({
            file: resultFile,
            existing: true,
            split: true,
            reload: true
        }));
    };

    return (
        <Button onClick={handleClick}>
            Synthesize with Yosys
        </Button>
    );
};
