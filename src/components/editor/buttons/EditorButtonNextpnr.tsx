import {Button} from '@primer/react';
import React from 'react';

// import {StorageDirectory, StorageFile} from '../../../storage';
// import {useAppDispatch} from '../../../store';
// import {openFile} from '../../../store/panels';
// import {createStorageDirectory, createStorageFile} from '../../../store/storage-entries';
import {placeAndRoute} from '../../../tools/nextpnr';

import {BaseEditorButtonProps} from './BaseEditorButton';

export const EditorButtonNextpnr: React.FC<BaseEditorButtonProps> = ({file}) => {
    // const dispatch = useAppDispatch();

    const handleClick = async () => {
        const result = await placeAndRoute(file);
        console.log(file, result);

        // const directory = file.file.getParent();

        // TODO: handle rejected action results

        // const actionDirectory = await dispatch(createStorageDirectory({
        //     parent: directory,
        //     name: file.file.getNameWithoutExtension()
        // }));
        // const actionFile = await dispatch(createStorageFile({
        //     parent: actionDirectory.payload as StorageDirectory<unknown, unknown>,
        //     name: 'rtl.dot',
        //     content: result
        // }));

        // dispatch(openFile({
        //     file: actionFile.payload as StorageFile<unknown, unknown>,
        //     existing: true,
        //     split: true,
        //     reload: true
        // }));
    };

    return (
        <Button onClick={handleClick}>
            Place and route with Nextpnr
        </Button>
    );
};
