import {DialogProps, DialogButtonProps} from '@primer/react/lib-esm/Dialog/Dialog';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {StringSchema} from 'yup';

export interface Popup {
    id: string;
    title: string;
    content?: string;
    width?: DialogProps['width'];
    form?: {
        name: string;
        label: string;
        defaultValue?: string;
        validate?: () => StringSchema;
    }[];
    actions?: {
        color: DialogButtonProps['buttonType'];
        label: string;
        type?: DialogButtonProps['type'] | 'close';
    }[];
    onSubmit?: (values: Record<string, unknown>) => Promise<void>;
}

export type PopupsState = Popup[];

const initialState: PopupsState = [];

export const popupsSlice = createSlice({
    name: 'popups',
    initialState,
    reducers: {
        openPopup(state, action: PayloadAction<Omit<Popup, 'id'>>) {
            state.push({
                id: uuidv4(),
                ...action.payload
            });
        },
        closePopup(state, action: PayloadAction<string>) {
            return state.filter((popup) => popup.id !== action.payload);
        }
    }
});

export const {openPopup, closePopup} = popupsSlice.actions;
