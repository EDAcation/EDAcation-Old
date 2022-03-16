import {Dialog} from '@primer/react';
import React from 'react';

import {useAppDispatch} from '../../store';
import {closePopup, Popup as StatePopup} from '../../store/popups';

export interface PopupProps {
    popup: StatePopup;
}

export const Popup: React.FC<PopupProps> = ({popup}) => {
    const dispatch = useAppDispatch();

    const handleDismiss = () => {
        dispatch(closePopup(popup));
    };

    return (
        <Dialog isOpen onDismiss={handleDismiss}>
            <Dialog.Header>{popup.title}</Dialog.Header>
        </Dialog>
    );
};
