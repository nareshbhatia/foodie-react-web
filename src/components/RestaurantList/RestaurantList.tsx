import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';

const RESTAURANTS_QUERY = gql`
    query RestaurantQuery($term: String!, $location: String!) {
        search(term: $term, location: $location, offset: 0, limit: 50) {
            total
            business {
                name
                rating
                review_count
                location {
                    address1
                    city
                    state
                    country
                }
            }
        }
    }
`;

export const RestaurantList = () => {
    const { loading, error, data } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            term: 'burrito',
            location: 'san francisco'
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Box p={2}>
            {data.search.business.map(({ id, name }: any) => (
                <div key={id}>
                    <Typography variant="body1">{name}</Typography>
                </div>
            ))}
        </Box>
    );
};
