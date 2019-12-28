import React from 'react';
import Box from '@material-ui/core/Box';
import { ListChildComponentProps } from 'react-window';
import { BusinessSearchQuery_search_business } from '../../queries';
import { LoadingCard } from '../LoadingCard';
import { BusinessCard } from '../BusinessCard';
import { ScrollContainer } from '../ScrollContainer';

const CARD_SIZE = 150 + 16;

interface BusinessListProps {
    total: number;
    businesses: Array<BusinessSearchQuery_search_business>;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
}

export const BusinessList = ({
    total,
    businesses,
    loadMoreItems
}: BusinessListProps) => {
    const handleItemClicked = (itemId: string) => {
        console.log('Item clicked:', itemId);
    };

    const BusinessItem = ({ index, style }: ListChildComponentProps) => {
        if (index >= businesses.length) {
            return <LoadingCard />;
        }

        return (
            <div style={style}>
                <Box p={1}>
                    <BusinessCard
                        business={businesses[index]}
                        onItemClicked={handleItemClicked}
                    />
                </Box>
            </div>
        );
    };

    return (
        <ScrollContainer
            hasNextPage={businesses.length < total}
            items={businesses}
            itemSize={CARD_SIZE}
            loadMoreItems={loadMoreItems}
            Item={BusinessItem}
        />
    );
};
