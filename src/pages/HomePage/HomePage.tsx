import React, { useReducer, useState } from 'react';
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
import { keySetToArray, keySetToString } from '../../models';
import { searchReducer, SearchState } from '../../reducers';
import { RESTAURANTS_QUERY } from '../../queries';

const initialState: SearchState = {
    term: '',
    location: '',
    sortBy: 'best_match',
    priceFilter: {
        1: false,
        2: false,
        3: false,
        4: false
    },
    categoryFilter: {
        bars: false,
        breakfast_brunch: false,
        grocery: false,
        restaurants: false,
        vegetarian: false
    },
    attributeFilter: {
        hot_and_new: false,
        waitlist_reservation: false
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
    const [filterVisible, setFilterVisible] = useState(false);
    const [state, dispatch] = useReducer(searchReducer, initialState);
    const {
        term,
        location,
        sortBy,
        categoryFilter,
        priceFilter,
        attributeFilter,
        openNow
    } = state;
    const { loading, error, data } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            term,
            location,
            sortBy,
            price: keySetToString(priceFilter),
            categories: keySetToString(categoryFilter),
            attributes: keySetToArray(attributeFilter),
            openNow
        },
        skip: location.length === 0
    });

    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    if (error) throw error;

    return (
        <ViewVerticalContainer>
            <Header>
                <HeaderTitle>Foodie</HeaderTitle>
                {data && data.search && (
                    <div className={classes.total}>{data.search.total}</div>
                )}
            </Header>

            <SearchBar
                searchState={state}
                searchDispatch={dispatch}
                filterVisible={filterVisible}
                toggleFilter={toggleFilter}
            />
            {filterVisible && (
                <FilterPanel searchState={state} searchDispatch={dispatch} />
            )}

            <VerticalContainer>
                {loading && <Loading />}
                {!loading && data && data.search && data.search.business && (
                    <RestaurantList restaurants={data.search.business} />
                )}
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};
