import gql from 'graphql-tag';

export const RESTAURANTS_QUERY = gql`
    query RestaurantQuery($term: String!, $location: String!) {
        search(term: $term, location: $location, offset: 0, limit: 20) {
            total
            business {
                id
                name
                categories {
                    title
                }
                photos
                price
                rating
                review_count
                reviews {
                    text
                }
            }
        }
    }
`;
