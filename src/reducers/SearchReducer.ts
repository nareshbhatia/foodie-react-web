// ----------------------------------------------------------------------------
// State
// ----------------------------------------------------------------------------
export interface SearchState {
    term: string;
    location: string;
    sortBy: string;
    categories: string;
    price: string;
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

export type SearchAction = SetSearchState;

// ----------------------------------------------------------------------------
// Reducer
// Accepts a state and an action and returns the new state:
//     (state, action) => newState
// ----------------------------------------------------------------------------
export const searchReducer = (state: SearchState, action: SearchAction) => {
    switch (action.type) {
        case 'SET_SEARCH_STATE':
            return { ...state, term: action.term, location: action.location };
        default:
            throw new Error('Unexpected action');
    }
};
