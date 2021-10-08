import {EditorFileOpened} from '../../state';

export interface BaseEditorProps {
    file: EditorFileOpened;
    value: string;
    onChange: (file: EditorFileOpened, newValue: string) => void;
    onSave?: (file: EditorFileOpened) => void;
}
