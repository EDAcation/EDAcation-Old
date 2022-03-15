import {EditorFileLoaded} from '../../../store/files';

export interface BaseEditorButtonProps {
    panelId: string;
    file: EditorFileLoaded;
}
