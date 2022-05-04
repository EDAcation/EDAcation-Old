import {Button} from '@primer/react';
import React from 'react';

import {StorageDirectory, StorageFile} from '../../../storage';
import {useAppDispatch} from '../../../store';
import {openFile} from '../../../store/panels';
import {createStorageDirectory, createStorageFile} from '../../../store/storage-entries';
import {synthesize} from '../../../tools/yosys';

import {BaseEditorButtonProps} from './BaseEditorButton';

export const EditorButtonYosys: React.FC<BaseEditorButtonProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const result = await synthesize(file);
        console.log(file, result);

        const directory = file.file.getParent();

        // TODO: handle rejected action results

        const actionDirectory = await dispatch(createStorageDirectory({
            parent: directory,
            name: file.file.getNameWithoutExtension()
        }));

        for (const resultFile of result) {
            const actionFile = await dispatch(createStorageFile({
                parent: actionDirectory.payload as StorageDirectory<unknown, unknown>,
                name: resultFile.name,
                content: resultFile.content
            }));

            if (resultFile.name === 'rtl.dot') {
                dispatch(openFile({
                    file: actionFile.payload as StorageFile<unknown, unknown>,
                    existing: true,
                    split: true,
                    reload: true
                }));
            }
        }
    };

    return (
        <Button onClick={handleClick}>
            Synthesize with Yosys
        </Button>
    );
};
