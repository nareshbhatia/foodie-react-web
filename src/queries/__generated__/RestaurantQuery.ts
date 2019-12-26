/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RestaurantQuery
// ====================================================

export interface RestaurantQuery_search_business_categories {
    __typename: 'Category';
    /**
     * Title of a category for display purposes.
     */
    title: string | null;
}

export interface RestaurantQuery_search_business_location {
    __typename: 'Location';
    /**
     * City of this business.
     */
    city: string | null;
}

export interface RestaurantQuery_search_business_reviews {
    __typename: 'Review';
    /**
     * Text excerpt of this review.
     */
    text: string | null;
}

export interface RestaurantQuery_search_business {
    __typename: 'Business';
    /**
     * Yelp ID of this business.
     */
    id: string | null;
    /**
     * Name of this business.
     */
    name: string | null;
    /**
     * A list of category title and alias pairs associated with this business.
     */
    categories: (RestaurantQuery_search_business_categories | null)[] | null;
    /**
     * When searching, this provides the distance of the business from the search location in meters
     */
    distance: number | null;
    /**
     * The location of this business, including address, city, state, postal code and country.
     */
    location: RestaurantQuery_search_business_location | null;
    /**
     * URLs of up to three photos of the business.
     */
    photos: (string | null)[] | null;
    /**
     * Price level of the business. Value is one of $, $$, $$$ and $$$$ or null if we
     * don't have price available for the business.
     */
    price: string | null;
    /**
     * Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).
     */
    rating: number | null;
    /**
     * Number of reviews for this business.
     */
    review_count: number | null;
    /**
     * Review snippets from the business.
     */
    reviews: (RestaurantQuery_search_business_reviews | null)[] | null;
}

export interface RestaurantQuery_search {
    __typename: 'Businesses';
    /**
     * Total number of businesses found.
     */
    total: number | null;
    /**
     * A list of business Yelp finds based on the search criteria.
     */
    business: (RestaurantQuery_search_business | null)[] | null;
}

export interface RestaurantQuery {
    /**
     * Search for businesses on Yelp.
     */
    search: RestaurantQuery_search | null;
}

export interface RestaurantQueryVariables {
    term: string;
    location: string;
}
