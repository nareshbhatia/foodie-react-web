import React from 'react';
import Box from '@material-ui/core/Box';
import { ListChildComponentProps } from 'react-window';
import { RestaurantQuery_search_business } from '../../queries';
import { LoadingCard } from '../LoadingCard';
import { RestaurantCard } from '../RestaurantCard';
import { ScrollContainer } from '../ScrollContainer';

const CARD_SIZE = 150 + 16;

interface RestaurantListProps {
    total: number;
    restaurants: Array<RestaurantQuery_search_business>;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
}

export const RestaurantList = ({
    total,
    restaurants,
    loadMoreItems
}: RestaurantListProps) => {
    const handleItemClicked = (itemId: string) => {
        console.log('Item clicked:', itemId);
    };

    const RestaurantItem = ({ index, style }: ListChildComponentProps) => {
        if (index >= restaurants.length) {
            return <LoadingCard />;
        }

        return (
            <div style={style}>
                <Box p={1}>
                    <RestaurantCard
                        restaurant={restaurants[index]}
                        onItemClicked={handleItemClicked}
                    />
                </Box>
            </div>
        );
    };

    return (
        <ScrollContainer
            hasNextPage={restaurants.length < total}
            items={restaurants}
            itemSize={CARD_SIZE}
            loadMoreItems={loadMoreItems}
            Item={RestaurantItem}
        />
    );
};
