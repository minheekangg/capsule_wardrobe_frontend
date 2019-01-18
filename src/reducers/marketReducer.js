import { FETCHED_LISTINGS, FETCHING_LISTINGS, RESET, SELECT_LISTING } from '../types';

const initialState = {
    listings: [],
    isListingLoading: false,
    select: []
};


export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHED_LISTINGS:
            return { ...state, listings: action.payload, isListingLoading: false };
        case FETCHING_LISTINGS:
            return { ...state, isListingLoading: true };
        case SELECT_LISTING:
            return { ...state, select: [action.payload] };
        case RESET:
            return initialState;
        default:
            return state;
    }
}