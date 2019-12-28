import React, { ComponentType } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

export interface ScrollContainerProps<T> {
    // Are there more items to load?
    hasNextPage: boolean;

    // Array of items loaded so far
    items: Array<T>;

    // Item size of an item
    itemSize: number;

    // Callback function responsible for loading the next page of items
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;

    Item: ComponentType<ListChildComponentProps>;
}

export function ScrollContainer<T>({
    hasNextPage,
    items,
    itemSize,
    loadMoreItems,
    Item
}: ScrollContainerProps<T>) {
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = hasNextPage ? items.length + 1 : items.length;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index: number) =>
        !hasNextPage || index < items.length;

    return (
        <AutoSizer>
            {({ height, width }) => (
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                >
                    {({ onItemsRendered, ref }) => (
                        <FixedSizeList
                            className="List"
                            height={height}
                            width={width}
                            itemCount={itemCount}
                            itemSize={itemSize}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                        >
                            {Item}
                        </FixedSizeList>
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    );
}
