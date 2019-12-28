import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/Apps';
import { RootStoreContext } from '../../contexts';

export const HomeButton = () => {
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;

    const handleClick = () => {
        routerStore.goTo('home');
    };

    return (
        <IconButton
            edge="start"
            color="inherit"
            onClick={handleClick}
            aria-label="Home"
        >
            <Apps />
        </IconButton>
    );
};
