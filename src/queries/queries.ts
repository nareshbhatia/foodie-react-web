import gql from 'graphql-tag';

export const RESTAURANTS_QUERY = gql`
    query RestaurantQuery(
        $term: String
        $location: String!
        $sortBy: String
        $attributes: [String]
        $categories: String
        $price: String
        $openNow: Boolean
    ) {
        search(
            term: $term
            location: $location
            sort_by: $sortBy
            attributes: $attributes
            categories: $categories
            price: $price
            open_now: $openNow
            offset: 0
            limit: 20
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
