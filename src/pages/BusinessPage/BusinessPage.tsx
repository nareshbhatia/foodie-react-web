import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import {
    BusinessDetailCard,
    BusinessHours,
    ReviewCard
} from '../../components';

const useStyles = makeStyles((theme: Theme) => ({
    subtitle: {
        fontWeight: theme.typography.fontWeightMedium
    }
}));

export const BusinessPage = () => {
    const classes = useStyles();
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

    const { reviews } = business;

    return (
        <ViewVerticalContainer>
            <Header>
                <BackButton />
                <HeaderTitle>Home</HeaderTitle>
            </Header>

            <ScrollingContainer p={2}>
                <BusinessDetailCard business={business} />

                {business.hours && <BusinessHours hours={business.hours} />}

                {reviews && reviews.length > 0 && (
                    <Box mt={2}>
                        <Typography
                            variant="subtitle1"
                            component="h2"
                            className={classes.subtitle}
                        >
                            Reviews
                        </Typography>
                        {reviews.map(
                            review =>
                                review && (
                                    <Box py={1}>
                                        <ReviewCard review={review} />
                                    </Box>
                                )
                        )}
                    </Box>
                )}
            </ScrollingContainer>
        </ViewVerticalContainer>
    );
};
