import {FormControl, TextInput, TextInputProps} from '@primer/react';
import {FieldProps} from 'formik';
import React from 'react';

export interface FieldTextInputProps extends FieldProps<string>, TextInputProps {
    label?: string;
    placeholder?: string;
}

export const FieldTextInput: React.FC<FieldTextInputProps> = ({
    field,
    form: {
        isSubmitting,
        touched,
        errors
    },
    label,
    placeholder,
    ...props
}) => {
    const isTouched = touched[field.name];
    const error = errors[field.name];

    return (
        <FormControl disabled={isSubmitting}>
            <FormControl.Label visuallyHidden={!label}>{label}</FormControl.Label>

            <TextInput
                {...field}
                aria-label={label || placeholder}
                placeholder={placeholder || label}
                {...props}
            />

            {isTouched && error && <FormControl.Validation variant="error">{error}</FormControl.Validation>}
        </FormControl>
    );
};
