import React, { useContext } from 'react';
import { RouterView } from 'mobx-state-router';
import { NotFound } from '@nareshbhatia/react-force';
import { RootStoreContext } from './contexts';
import { BusinessPage, HomePage } from './pages';

// Create a viewMap for the RouterView
const viewMap = {
    business: <BusinessPage />,
    home: <HomePage />,
    notFound: <NotFound />
};

export const Router = () => {
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;

    return <RouterView routerStore={routerStore} viewMap={viewMap} />;
};
