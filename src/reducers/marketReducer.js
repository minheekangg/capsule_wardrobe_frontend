import { FETCHED_LISTINGS, FETCHING_LISTINGS, RESET, SELECT_LISTING } from '../types';

const initialState = {
    listings: [],
    isListingLoading: false,
    selectedListing: []
};


export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHED_LISTINGS:
            return { ...state, listings: action.payload, isListingLoading: false };
        case FETCHING_LISTINGS:
            return { ...state, isListingLoading: true };
        case SELECT_LISTING:
            return { ...state, selectedListing: action.payload };
        case RESET:
            return initialState;
        default:
            return state;
    }
}