import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import {
    Header,
    HeaderTitle,
    Loading,
    ScrollingContainer,
    ViewVerticalContainer
} from '@nareshbhatia/react-force';
import { BackButton } from '../../components/Header';
import { RootStoreContext } from '../../contexts';
import { BUSINESS_QUERY, BusinessQuery_business } from '../../queries';

export const BusinessPage = () => {
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;
    const id = routerStore.routerState.params.id;

    const { loading, error, data } = useQuery(BUSINESS_QUERY, {
        variables: {
            id
        }
    });

    if (loading) {
        return <Loading />;
    }
    if (error) throw error;

    const business: BusinessQuery_business = data && data.business;
    if (!business) return null;

    const { name } = business;

    return (
        <ViewVerticalContainer>
            <Header>
                <BackButton />
                <HeaderTitle>Home</HeaderTitle>
            </Header>

            <ScrollingContainer p={2}>
                <Typography variant="h4" component="h1">
                    {name}
                </Typography>
            </ScrollingContainer>
        </ViewVerticalContainer>
    );
};
