import {ActionList, ActionMenu} from '@primer/react';
import React from 'react';

import {PanelEditorFile} from '../../store/panels';

import {EditorDefinition} from './editors';

export interface EditorMenuProps {
    editors: EditorDefinition[];
    selectedEditor: EditorDefinition;
    fileInfo: PanelEditorFile;
    onChange: (fileInfo: PanelEditorFile, editor: EditorDefinition) => void;
}

export const EditorMenu: React.FC<EditorMenuProps> = ({editors, selectedEditor, fileInfo, onChange}) => (
    <ActionMenu>
        <ActionMenu.Button>{selectedEditor.name}</ActionMenu.Button>
        <ActionMenu.Overlay>
            <ActionList>
                {/* @ts-expect-error: ActionList.Group has no children property */}
                <ActionList.Group selectionVariant="single">
                    {editors.map((editor) => (
                        <ActionList.Item key={editor.id} selected={editor.id === selectedEditor.id} onSelect={() => onChange(fileInfo, editor)}>
                            {editor.name}
                        </ActionList.Item>
                    ))}
                </ActionList.Group>
            </ActionList>
        </ActionMenu.Overlay>
    </ActionMenu>
);
