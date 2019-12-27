import { KeySet, setKeySetKey } from '../models';

// ----------------------------------------------------------------------------
// State
// ----------------------------------------------------------------------------
export interface SearchState {
    term: string;
    location: string;
    sortBy: string;
    priceFilter: KeySet;
    categoryFilter: KeySet;
    attributeFilter: KeySet;
    openNow: boolean;
}

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------
export interface SetSearchState {
    type: 'SET_SEARCH_STATE';
    term: string;
    location: string;
}

export interface SetSortBy {
    type: 'SET_SORT_BY';
    sortBy: string;
}

export interface SetPriceFilter {
    type: 'SET_PRICE_FILTER';
    key: string;
    value: boolean;
}

export interface SetCategoryFilter {
    type: 'SET_CATEGORY_FILTER';
    key: string;
    value: boolean;
}

export interface SetAttributeFilter {
    type: 'SET_ATTRIBUTE_FILTER';
    key: string;
    value: boolean;
}

export interface ToggleOpenNow {
    type: 'TOGGLE_OPEN_NOW';
}

export type SearchAction =
    | SetSearchState
    | SetSortBy
    | SetPriceFilter
    | SetCategoryFilter
    | SetAttributeFilter
    | ToggleOpenNow;

// ----------------------------------------------------------------------------
// Reducer
// Accepts a state and an action and returns the new state:
//     (state, action) => newState
// ----------------------------------------------------------------------------
export const searchReducer = (state: SearchState, action: SearchAction) => {
    switch (action.type) {
        case 'SET_SEARCH_STATE':
            return { ...state, term: action.term, location: action.location };
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.sortBy };
        case 'SET_PRICE_FILTER':
            return {
                ...state,
                priceFilter: setKeySetKey(
                    state.priceFilter,
                    action.key,
                    action.value
                )
            };
        case 'SET_CATEGORY_FILTER':
            return {
                ...state,
                categoryFilter: setKeySetKey(
                    state.categoryFilter,
                    action.key,
                    action.value
                )
            };
        case 'SET_ATTRIBUTE_FILTER':
            return {
                ...state,
                attributeFilter: setKeySetKey(
                    state.attributeFilter,
                    action.key,
                    action.value
                )
            };
        case 'TOGGLE_OPEN_NOW':
            return { ...state, openNow: !state.openNow };
        default:
            throw new Error('Unexpected action');
    }
};
