import React from 'react';
import {
    Header,
    HeaderTitle,
    ViewVerticalContainer
} from '@nareshbhatia/react-force';
import { BackButton } from '../../components/Header';

export const BusinessPage = () => {
    return (
        <ViewVerticalContainer>
            <Header>
                <BackButton />
                <HeaderTitle>Business Name</HeaderTitle>
            </Header>
        </ViewVerticalContainer>
    );
};
