import React from 'react';
import {
    Header,
    HeaderTitle,
    VerticalContainer,
    ViewVerticalContainer
} from '@nareshbhatia/react-force';
import { RestaurantList } from '../../components';

export const HomePage = () => {
    return (
        <ViewVerticalContainer>
            <Header>
                <HeaderTitle>Foodie</HeaderTitle>
            </Header>
            <VerticalContainer>
                <RestaurantList />
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};
