import gql from 'graphql-tag';

export const BUSINESS_SEARCH_QUERY = gql`
    query BusinessSearchQuery(
        $term: String
        $location: String!
        $sortBy: String
        $attributes: [String]
        $categories: String
        $price: String
        $openNow: Boolean
        $offset: Int
        $limit: Int
    ) {
        search(
            term: $term
            location: $location
            sort_by: $sortBy
            attributes: $attributes
            categories: $categories
            price: $price
            open_now: $openNow
            offset: $offset
            limit: $limit
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
