import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type SettingsState = {
    theme: 'light' | 'dark';
};

const initialState: SettingsState = {
    theme: 'dark'
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSetting<Key extends keyof SettingsState>(state: SettingsState, action: PayloadAction<{key: Key; value: SettingsState[Key]}>) {
            state[action.payload.key] = action.payload.value;
        }
    }
});

export const {setSetting} = settingsSlice.actions;
