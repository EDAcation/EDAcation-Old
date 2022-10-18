import {Button} from '@primer/react';
import React from 'react';

import {StorageFile} from '../../../storage';
import {useAppDispatch} from '../../../store';
import {openFile} from '../../../store/panels';
import {executeNextpnr} from '../../../tools';

import {BaseEditorButtonProps} from './BaseEditorButton';

export const EditorButtonNextpnr: React.FC<BaseEditorButtonProps> = ({file}) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const result = await executeNextpnr(file);
        console.log(file, result);

        const directory = file.file.getParent();

        // TODO: handle rejected action results

        for (const path of result) {
            if (path.endsWith('routed.svg')) {
                const resultFile = await directory.getEntryByPath(path.split('/'));
                if (!resultFile || !(resultFile instanceof StorageFile)) {
                    throw new Error('Result is not a storage file.');
                }

                dispatch(openFile({
                    file: resultFile,
                    existing: true,
                    split: true,
                    reload: true
                }));
            }
        }
    };

    return (
        <Button onClick={handleClick}>
            Place and route with Nextpnr
        </Button>
    );
};
