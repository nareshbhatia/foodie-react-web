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
import {
    FilterPanel,
    HomeButton,
    BusinessList,
    SearchBar
} from '../../components';
import { keySetToArray, keySetToString } from '../../models';
import { searchReducer, SearchState } from '../../reducers';
import { BUSINESS_SEARCH_QUERY } from '../../queries';

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
        businesses: false,
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
    const { loading, error, data, fetchMore } = useQuery(
        BUSINESS_SEARCH_QUERY,
        {
            variables: {
                term,
                location,
                sortBy,
                price: keySetToString(priceFilter),
                categories: keySetToString(categoryFilter),
                attributes: keySetToArray(attributeFilter),
                openNow,
                offset: 0,
                limit: 20
            },
            skip: location.length === 0
        }
    );

    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    const loadMoreItems = async (startIndex: number) => {
        await fetchMore({
            variables: {
                offset: startIndex
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    search: {
                        ...prev.search,
                        business: [
                            ...prev.search.business,
                            ...fetchMoreResult.search.business
                        ]
                    }
                });
            }
        });
    };

    if (error) throw error;

    const total = data && data.search && data.search.total;
    const businesses = (data && data.search && data.search.business) || [];

    return (
        <ViewVerticalContainer>
            <Header>
                <HomeButton />
                <HeaderTitle>Foodie</HeaderTitle>
                {data && data.search && (
                    <div className={classes.total}>{total}</div>
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
                {!loading && (
                    <BusinessList
                        total={total}
                        businesses={businesses}
                        loadMoreItems={loadMoreItems}
                    />
                )}
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};
