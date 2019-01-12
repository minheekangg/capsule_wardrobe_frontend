import { FETCHED_OUTFITS, FETCHING_OUTFITS, RESET } from '../types';

const initialState = {
    outfits: [],
    LoadedOutfits: false
};


export default function outfitReducer(state = initialState, action) {
    console.log("%c outfitReducer", "color: pink", state, action);
    switch (action.type) {
        case FETCHED_OUTFITS:
            return { ...state, items: action.payload, LoadedOutfits: true };
        case FETCHING_OUTFITS:
            return { ...state, LoadedOutfits: false };
        case RESET:
            return initialState
        default:
            return state;
    }
}