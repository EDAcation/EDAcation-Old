export interface State {
    theme: 'light' | 'dark';
    editor: {
        openFileId: string | null;
    };
}

export const DEFAULT_STATE: State = {
    theme: 'dark',
    editor: {
        openFileId: null
    }
};
