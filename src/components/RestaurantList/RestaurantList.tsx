import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { Loading } from '@nareshbhatia/react-force';
import { RestaurantCard } from '../RestaurantCard';
import {
    RESTAURANTS_QUERY,
    RestaurantQuery_search_business
} from '../../queries';
import { SearchState } from '../../reducers';

interface RestaurantListProps {
    searchState: SearchState;
}

export const RestaurantList = ({ searchState }: RestaurantListProps) => {
    const { term, location } = searchState;
    const { loading, error, data } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            term,
            location
        },
        skip: location.length === 0
    });

    const handleItemClicked = (itemId: string) => {
        console.log('Item clicked:', itemId);
    };

    if (loading) return <Loading />;
    if (error) throw error;

    return (
        <React.Fragment>
            {data &&
                data.search &&
                data.search.business &&
                data.search.business.map(
                    (
                        business: RestaurantQuery_search_business,
                        index: number
                    ) => (
                        <Box key={business.id || index} p={1}>
                            <RestaurantCard
                                business={business}
                                onItemClicked={handleItemClicked}
                            />
                        </Box>
                    )
                )}
        </React.Fragment>
    );
};
