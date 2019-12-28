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

export const BUSINESS_QUERY = gql`
    query BusinessQuery($id: String!) {
        business(id: $id) {
            name
            display_phone
            categories {
                title
            }
            location {
                address1
                address2
                address3
                city
                state
                postal_code
                country
            }
            hours {
                hours_type
                open {
                    day
                    start
                    end
                }
            }
            photos
            price
            rating
            review_count
            reviews {
                id
                text
                rating
                time_created
                user {
                    name
                    image_url
                }
            }
        }
    }
`;
