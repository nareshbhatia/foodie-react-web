import gql from 'graphql-tag';

export const RESTAURANTS_QUERY = gql`
    query RestaurantQuery(
        $term: String
        $location: String!
        $sortBy: String
        $categories: String
        $price: String
        $openNow: Boolean
    ) {
        search(
            term: $term
            location: $location
            offset: 0
            limit: 20
            sort_by: $sortBy
            categories: $categories
            price: $price
            open_now: $openNow
        ) {
            total
            business {
                id
                name
                categories {
                    title
                }
                distance
                location {
                    city
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
