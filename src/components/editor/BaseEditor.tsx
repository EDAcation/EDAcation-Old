import {EditorFileLoaded} from '../../store/files';

export interface BaseEditorProps {
    file: EditorFileLoaded;
    value: string;
    onChange: (file: EditorFileLoaded, newValue: string) => void;
    onSave?: (file: EditorFileLoaded) => void;
}
