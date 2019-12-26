import React, { useReducer } from 'react';
import {
    Header,
    HeaderTitle,
    VerticalContainer,
    ViewVerticalContainer
} from '@nareshbhatia/react-force';
import { RestaurantList, SearchBar } from '../../components';
import { searchReducer, SearchState } from '../../reducers';

const initialState: SearchState = {
    term: '',
    location: ''
};

export const HomePage = () => {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    return (
        <ViewVerticalContainer>
            <Header>
                <HeaderTitle>Foodie</HeaderTitle>
            </Header>
            <SearchBar searchState={state} searchDispatch={dispatch} />
            <VerticalContainer>
                <RestaurantList searchState={state} />
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};
