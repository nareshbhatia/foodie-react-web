import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { useField } from 'formik';

export const TextField = ({ ...props }) => {
    const [field, meta] = useField(props.name);

    return (
        <InputBase
            {...field}
            {...props}
            error={!!(meta.touched && meta.error)}
        />
    );
};
