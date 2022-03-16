import {Text} from '@primer/react';
import {Dialog} from '@primer/react/lib-esm/Dialog/Dialog';
import React, {useRef, useState} from 'react';

import {useAppDispatch} from '../../store';
import {closePopup, Popup as StatePopup} from '../../store/popups';

export interface PopupProps {
    popup: StatePopup;
}

export const Popup: React.FC<PopupProps> = ({popup}) => {
    const dispatch = useAppDispatch();

    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        dispatch(closePopup(popup.id));
    };

    const handleSubmitClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const handleSubmit: React.FormEventHandler = async (event) => {
        console.log('submit');
        event.preventDefault();

        setIsSubmitting(true);

        // TODO: include form values
        if (popup.onSubmit) {
            await popup.onSubmit();
        }

        setIsSubmitting(false);
        handleClose();
    };

    // TODO: add form values (Formik?)

    return (
        <Dialog
            title={popup.title}
            width={popup.width || 'large'}
            footerButtons={popup.actions?.map((action) => ({
                buttonType: action.color,
                content: action.label,
                type: action.type === 'close' ? 'button' : action.type,
                onClick: action.type === 'close' ? handleClose : (action.type === 'submit' ? handleSubmitClick : undefined),
                disabled: isSubmitting
            }))}
            onClose={handleClose}
        >
            <form ref={formRef} onSubmit={handleSubmit}>
                {popup.content && <Text>{popup.content}</Text>}
            </form>
        </Dialog>
    );
};
