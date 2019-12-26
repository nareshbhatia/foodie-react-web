import React from 'react';
import Box from '@material-ui/core/Box';
import { RestaurantCard } from '../RestaurantCard';
import { RestaurantQuery_search_business } from '../../queries';

interface RestaurantListProps {
    restaurants: Array<RestaurantQuery_search_business>;
}

export const RestaurantList = ({ restaurants }: RestaurantListProps) => {
    const handleItemClicked = (itemId: string) => {
        console.log('Item clicked:', itemId);
    };

    return (
        <React.Fragment>
            {restaurants.map(
                (
                    restaurant: RestaurantQuery_search_business,
                    index: number
                ) => (
                    <Box key={restaurant.id || index} p={1}>
                        <RestaurantCard
                            restaurant={restaurant}
                            onItemClicked={handleItemClicked}
                        />
                    </Box>
                )
            )}
        </React.Fragment>
    );
};
