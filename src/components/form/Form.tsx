import {Formik, FormikConfig} from 'formik';
import React from 'react';

export interface FormProps<Values> extends FormikConfig<Values> {
    formRef?: React.ClassAttributes<HTMLFormElement>['ref'];
}

export const Form = <Values = Record<string, never>>({children, formRef, onSubmit, ...props}: FormProps<Values>): ReturnType<React.FC> => {
    const innerOnSubmit: FormProps<Values>['onSubmit'] = async (values, helpers) => {
        try {
            return await onSubmit(values, helpers);
        } catch (err) {
            // TODO: display errors
            console.error(err);

            helpers.setSubmitting(false);
        }
    };

    return (
        <Formik<Values> onSubmit={innerOnSubmit} {...props}>
            {(formikProps) => (
                <form ref={formRef} onSubmit={formikProps.handleSubmit}>
                    {typeof children === 'function' ? children(formikProps) : children}
                </form>
            )}
        </Formik>
    );
};
