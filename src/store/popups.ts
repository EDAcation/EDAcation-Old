import {DialogProps, DialogButtonProps} from '@primer/react/lib-esm/Dialog/Dialog';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

export interface Popup {
    id: string;
    title: string;
    content?: string;
    width?: DialogProps['width'];
    form?: {
        name: string;
        label: string;
        defaultValue?: string;
    }[];
    actions?: {
        color: DialogButtonProps['buttonType'];
        label: string;
        type?: DialogButtonProps['type'] | 'close';
    }[];
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
        closePopup(state, action: PayloadAction<Popup>) {
            return state.filter((popup) => popup.id !== action.payload.id);
        }
    }
});

export const {openPopup, closePopup} = popupsSlice.actions;
