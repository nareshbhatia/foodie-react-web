/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BusinessQuery
// ====================================================

export interface BusinessQuery_business_categories {
    __typename: 'Category';
    /**
     * Title of a category for display purposes.
     */
    title: string | null;
}

export interface BusinessQuery_business_location {
    __typename: 'Location';
    /**
     * Street address of this business.
     */
    address1: string | null;
    /**
     * Street address of this business, continued.
     */
    address2: string | null;
    /**
     * Street address of this business, continued.
     */
    address3: string | null;
    /**
     * City of this business.
     */
    city: string | null;
    /**
     * ISO 3166-2 (with a few exceptions) state code of this business.
     */
    state: string | null;
    /**
     * Postal code of this business.
     */
    postal_code: string | null;
    /**
     * ISO 3166-1 alpha-2 country code of this business.
     */
    country: string | null;
}

export interface BusinessQuery_business_hours_open {
    __typename: 'OpenHours';
    /**
     * From 0 to 6, representing day of the week from Monday to Sunday. Notice that
     * you may get the same day of the week more than once if the business has more
     * than one opening time slots.
     */
    day: number | null;
    /**
     * Start of the opening hours in a day, in 24-hour clock notation, like 1000 means 10 AM.
     */
    start: string | null;
    /**
     * End of the opening hours in a day, in 24-hour clock notation, like 2130 means 9:30 PM.
     */
    end: string | null;
}

export interface BusinessQuery_business_hours {
    __typename: 'Hours';
    /**
     * The type of the opening hours information. Right now, this is always REGULAR.
     */
    hours_type: string | null;
    /**
     * The specific open hours and days for a business.
     */
    open: (BusinessQuery_business_hours_open | null)[] | null;
}

export interface BusinessQuery_business_reviews_user {
    __typename: 'User';
    /**
     * Name of the user.
     */
    name: string | null;
    /**
     * URL of the user's profile photo.
     */
    image_url: string | null;
}

export interface BusinessQuery_business_reviews {
    __typename: 'Review';
    /**
     * Yelp ID of this review.
     */
    id: string | null;
    /**
     * Text excerpt of this review.
     */
    text: string | null;
    /**
     * Rating of this review.
     */
    rating: number | null;
    /**
     * The time that the review was created in PST.
     */
    time_created: string | null;
    /**
     * The user who wrote the review.
     */
    user: BusinessQuery_business_reviews_user | null;
}

export interface BusinessQuery_business {
    __typename: 'Business';
    /**
     * Name of this business.
     */
    name: string | null;
    /**
     * Phone number of the business formatted nicely to be displayed to users. The
     * format is the standard phone number format for the business's country.
     */
    display_phone: string | null;
    /**
     * A list of category title and alias pairs associated with this business.
     */
    categories: (BusinessQuery_business_categories | null)[] | null;
    /**
     * The location of this business, including address, city, state, postal code and country.
     */
    location: BusinessQuery_business_location | null;
    /**
     * Opening hours of the business.
     */
    hours: (BusinessQuery_business_hours | null)[] | null;
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
    reviews: (BusinessQuery_business_reviews | null)[] | null;
}

export interface BusinessQuery {
    /**
     * Load information about a specific business.
     */
    business: BusinessQuery_business | null;
}

export interface BusinessQueryVariables {
    id: string;
}
