import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { history } from '../../utils';

export const BackButton = () => {
    return (
        <IconButton
            edge="start"
            color="inherit"
            onClick={history.goBack}
            aria-label="Back"
        >
            <ArrowBack />
        </IconButton>
    );
};
