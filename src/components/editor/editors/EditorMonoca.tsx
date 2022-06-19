import React, {useCallback, useEffect} from 'react';
import MonacoEditor, {loader} from '@monaco-editor/react';

import {useAppSelector} from '../../../store';
import {EditorFileLoaded} from '../../../store/files';

import {BaseEditorProps} from './BaseEditor';

// Preload Monaco editor
loader.init();

export type EditorMonacoProps = BaseEditorProps;

// NOTE: Ugly hack to have file access in commands
let latestFile: EditorFileLoaded;

export const EditorMonaco: React.FC<EditorMonacoProps> = ({panelId, file, value, onChange, onSave}) => {
    const theme = useAppSelector((state) => state.settings.theme);

    // NOTE: Ugly hack to have file access in commands
    latestFile = file;

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();

                if (onSave) {
                    onSave(latestFile);
                }
            }
        },
        [onSave]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    // const handleMount: OnMount = useCallback(
    //     (editor, monaco) => {
    //         // @ts-expect-error: KEY_S does not exist on the type, but gives the correct value
    //         editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, (...args) => {
    //             console.log(...args);
    //             if (onSave) {
    //                 onSave(latestFile);
    //             }
    //         });
    //     },
    //     [onSave]
    // );

    return (
        <MonacoEditor
            path={`${panelId}/${file.file.getFullPath()}`}
            theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
            value={value}
            // onMount={handleMount}
            onChange={(newValue) => onChange(file, newValue ?? '')}
            options={{
                automaticLayout: true
            }}
        />
    );
};
