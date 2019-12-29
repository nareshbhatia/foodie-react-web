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
import { BusinessDetailCard, ReviewCard } from '../../components';

const day2str = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        display: 'flex',
        height: 150
    },
    content: {
        flex: 1,
        padding: '0 16px',
        '&:last-child': {
            paddingBottom: 0
        }
    },
    smallText: {
        fontSize: '0.75rem'
    },
    subtitle: {
        fontWeight: theme.typography.fontWeightMedium
    },
    img: {
        width: 150,
        height: 150,
        minWidth: 150,
        minHeight: 150,
        objectFit: 'cover'
    },
    name: {
        flex: 1
    },
    rating: {
        marginRight: theme.spacing(1)
    },
    review: {
        marginTop: '6px'
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

    const { hours, reviews } = business;

    // Create hour table
    let hoursTable = '';

    if (hours) {
        hours.forEach(hour => {
            if (hour && hour.open) {
                hour.open.forEach(open => {
                    if (open) {
                        const { day, start, end } = open;
                        hoursTable += `
<tr>
  <td>${day !== null ? day2str[day] : ''}</td>
  <td>${start}</td>
  <td>${end}</td>
</tr>
`;
                    }
                });
            }
        });
    }

    if (hoursTable.length > 0) {
        hoursTable = `<table>${hoursTable}</table>`;
    }

    return (
        <ViewVerticalContainer>
            <Header>
                <BackButton />
                <HeaderTitle>Home</HeaderTitle>
            </Header>

            <ScrollingContainer p={2}>
                <BusinessDetailCard business={business} />

                {hoursTable && (
                    <Box mt={2}>
                        <Typography
                            variant="subtitle1"
                            component="h2"
                            className={classes.subtitle}
                        >
                            Hours
                        </Typography>
                        <Box dangerouslySetInnerHTML={{ __html: hoursTable }} />
                    </Box>
                )}

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
