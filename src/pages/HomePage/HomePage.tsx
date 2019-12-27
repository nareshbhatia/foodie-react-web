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
import { FilterPanel, RestaurantList, SearchBar } from '../../components';
import { keySetToString } from '../../models';
import { searchReducer, SearchState } from '../../reducers';
import { RESTAURANTS_QUERY } from '../../queries';

const initialState: SearchState = {
    term: '',
    location: '',
    sortBy: 'best_match',
    categories: 'restaurants',
    priceFilter: {
        1: false,
        2: false,
        3: false,
        4: false
    },
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
    const { term, location, sortBy, categories, priceFilter, openNow } = state;
    const { loading, error, data } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            term,
            location,
            sortBy,
            categories,
            price: keySetToString(priceFilter),
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
            <FilterPanel searchState={state} searchDispatch={dispatch} />
            <VerticalContainer>
                {loading && <Loading />}
                {!loading && data && data.search && data.search.business && (
                    <RestaurantList restaurants={data.search.business} />
                )}
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};
