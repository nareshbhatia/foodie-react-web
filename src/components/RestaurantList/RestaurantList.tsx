import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { Loading } from '@nareshbhatia/react-force';
import { RestaurantCard } from '../RestaurantCard';
import {
    RESTAURANTS_QUERY,
    RestaurantQuery_search_business
} from '../../queries';

export const RestaurantList = () => {
    const { loading, error, data } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            term: 'burrito',
            location: 'san francisco'
        }
    });

    const handleItemClicked = (itemId: string) => {
        console.log('Item clicked:', itemId);
    };

    if (loading) return <Loading />;
    if (error) throw error;

    return (
        <React.Fragment>
            {data.search.business.map(
                (business: RestaurantQuery_search_business, index: number) => (
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
