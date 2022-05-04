import {EditorFileLoaded} from '../../../store/files';

export interface BaseEditorProps {
    panelId: string;
    file: EditorFileLoaded;
    value: string;
    onChange: (file: EditorFileLoaded, newValue: string) => void;
    onSave?: (file: EditorFileLoaded) => void;
}
