import {
  FETCHED_LISTINGS,
  FETCHING_LISTINGS,
  RESET,
  SELECT_LISTING,
  DESELECT_LISTING,
  POST_LISTING
} from "../types";

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
        case DESELECT_LISTING:
            return {...state, select: []}
        case RESET:
            return initialState;
        case POST_LISTING:
            return { ...state, listings: [...state.listings, action.payload], isListingLoading: false }; 
        default:
            return state;
    }
}