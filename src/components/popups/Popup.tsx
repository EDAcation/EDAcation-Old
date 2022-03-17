import {Text} from '@primer/react';
import {Dialog} from '@primer/react/lib-esm/Dialog/Dialog';
import {Field} from 'formik';
import React, {useRef, useState} from 'react';
import * as yup from 'yup';

import {useAppDispatch} from '../../store';
import {closePopup, Popup as StatePopup} from '../../store/popups';
import {FieldTextInput} from '../form/FieldTextInput';
import {Form, FormProps} from '../form/Form';

export interface PopupProps {
    popup: StatePopup;
}

type Values = Record<string, unknown>;

export const Popup: React.FC<PopupProps> = ({popup}) => {
    const dispatch = useAppDispatch();

    const formRef = useRef<HTMLFormElement>(null);

    const handleClose = () => {
        dispatch(closePopup(popup.id));
    };

    const handleSubmitClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const handleSubmit: FormProps<Values>['onSubmit'] = async (values, helpers) => {
        if (popup.onSubmit) {
            await popup.onSubmit(values);
        }

        helpers.setSubmitting(false);
        handleClose();
    };

    const fields = popup.form || [];
    const initialValues: Values = fields.reduce((prev, field) => {
        prev[field.name] = field.defaultValue || '';
        return prev;
    }, {});
    const validationSchema = yup.object(fields.reduce((prev, field) => {
        prev[field.name] = field.validate ? field.validate() : yup.string().required();
        return prev;
    }, {}));

    // TODO: auto focus on first field

    return (
        <Form<Values>
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={handleSubmit}
            formRef={formRef}
        >
            {({isSubmitting, isValid}) => (
                <Dialog
                    title={popup.title}
                    width={popup.width || 'large'}
                    footerButtons={popup.actions?.map((action) => ({
                        buttonType: action.color,
                        content: action.label,
                        type: action.type === 'close' ? 'button' : action.type,
                        onClick: action.type === 'close' ? handleClose : (action.type === 'submit' ? handleSubmitClick : undefined),
                        disabled: isSubmitting || (action.type === 'submit' && !isValid)
                    }))}
                    onClose={handleClose}
                >
                    {popup.content && <Text>{popup.content}</Text>}

                    {fields.map((field) => (
                        <Field key={field.name} component={FieldTextInput} name={field.name} type="text" placeholder={field.label} />
                    ))}
                </Dialog>
            )}
        </Form>
    );
};
