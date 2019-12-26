import gql from 'graphql-tag';

export const RESTAURANTS_QUERY = gql`
    query RestaurantQuery($term: String!, $location: String!) {
        search(
            term: $term
            location: $location
            offset: 0
            limit: 20
            sort_by: "distance"
            categories: "restaurants"
            price: "1,2,3"
            open_now: false
        ) {
            total
            business {
                id
                name
                categories {
                    title
                }
                distance
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
