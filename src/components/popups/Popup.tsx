import {Text} from '@primer/react';
import {Dialog} from '@primer/react/lib-esm/Dialog/Dialog';
import React from 'react';

import {useAppDispatch} from '../../store';
import {closePopup, Popup as StatePopup} from '../../store/popups';

export interface PopupProps {
    popup: StatePopup;
}

export const Popup: React.FC<PopupProps> = ({popup}) => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closePopup(popup));
    };

    // TODO: add form

    return (
        <Dialog
            title={popup.title}
            width={popup.width || 'large'}
            footerButtons={popup.actions?.map((action) => ({
                buttonType: action.color,
                content: action.label,
                type: action.type === 'close' ? 'button' : action.type,
                onClick: action.type === 'close' ? handleClose : undefined
            }))}
            onClose={handleClose}
        >
            {popup.content && <Text>{popup.content}</Text>}
        </Dialog>
    );
};
