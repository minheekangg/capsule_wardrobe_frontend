import { FETCHED_OUTFITS, CREATING_OUTFITS, CREATED_OUTFIT, RESET } from "../types";


const initialState = {
    outfits: [],
    outfitLoaded: false
};


export default function outfitReducer(state = initialState, action) {
    console.log("%c outfitReducer", "color: pink", state, action);
    switch (action.type) {
        case FETCHED_OUTFITS:
            return { ...state, outfits: action.payload, LoadedOutfits: true };
        case CREATED_OUTFIT:
            return { ...state, outfitLoaded: true };
        case CREATING_OUTFITS:
            return { ...state, outfitLoaded: false };
        case RESET:
            return initialState
        default:
            return state;
    }
}