import { FETCHED_OUTFITS, CREATING_OUTFITS, CREATED_OUTFIT, RESET } from "../types";


const initialState = {
  outfits: [],
  outfitsLoaded: false
};


export default function outfitReducer(state = initialState, action) {
    console.log("%c outfitReducer", "color: pink", state, action);
    switch (action.type) {
        case FETCHED_OUTFITS:
            return { ...state, outfits: action.payload, outfitsLoaded: true };
        case CREATED_OUTFIT:
            return { ...state, outfitsLoaded: true };
        case CREATING_OUTFITS:
            return { ...state, outfitsLoaded: false };
        case RESET:
            return initialState
        default:
            return state;
    }
}