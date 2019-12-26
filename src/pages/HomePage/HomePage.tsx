import React, { useReducer } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Header,
    HeaderTitle,
    Loading,
    VerticalContainer,
    ViewVerticalContainer
} from '@nareshbhatia/react-force';
import { RestaurantList, SearchBar } from '../../components';
import { searchReducer, SearchState } from '../../reducers';
import { RESTAURANTS_QUERY } from '../../queries';

const initialState: SearchState = {
    term: '',
    location: '',
    sortBy: 'distance',
    categories: 'restaurants',
    price: '1,2,3',
    openNow: false
};

const useStyles = makeStyles((theme: Theme) => ({
    total: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1),
        borderRadius: theme.spacing(2)
    }
}));

export const HomePage = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(searchReducer, initialState);
    const { term, location, sortBy, categories, price, openNow } = state;
    const { loading, error, data } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            term,
            location,
            sortBy,
            categories,
            price,
            openNow
        },
        skip: location.length === 0
    });

    if (error) throw error;

    return (
        <ViewVerticalContainer>
            <Header>
                <HeaderTitle>Foodie</HeaderTitle>
                {data && data.search && (
                    <div className={classes.total}>{data.search.total}</div>
                )}
            </Header>
            <SearchBar searchState={state} searchDispatch={dispatch} />
            <VerticalContainer>
                {loading && <Loading />}
                {!loading && data && data.search && data.search.business && (
                    <RestaurantList restaurants={data.search.business} />
                )}
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};
