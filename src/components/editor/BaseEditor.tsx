import {EditorFile} from '../../state';

export interface BaseEditorProps {
    file: EditorFile;
    value: string;
    onChange: (file: EditorFile, newValue: string) => void;
    onSave?: (file: EditorFile) => void;
}
