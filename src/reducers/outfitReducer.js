import { FETCHED_OUTFITS, CREATING_OUTFITS, CREATED_OUTFIT, RESET, UPDATED_OUTFITS, GET_LOCATION, GET_WEATHER, GET_PRETTY_LOC } from "../types";


const initialState = {
  outfits: [],
  outfitsLoaded: false,
  createdOutfit: false,
  location: {latitude: "", longitude: ""},
  weather: {weather: "",temperature: "", timezone: ""}
};


export default function outfitReducer(state = initialState, action) {
    console.log("%c outfitReducer", "color: pink", state, action);
    switch (action.type) {
        case FETCHED_OUTFITS:
            return { ...state, outfits: action.payload, outfitsLoaded: true, createdOutfit: false };
        case CREATED_OUTFIT:
            return { ...state, outfitsLoaded: true, createdOutfit: true };
        case CREATING_OUTFITS:
            return { ...state, outfitsLoaded: false, createdOutfit: false };
        case UPDATED_OUTFITS: 
            let others = state.outfits.filter(s => { return s.id !== action.payload.id })
            return { ...state, outfits: [...others, action.payload], outfitsLoaded: true };
        case GET_LOCATION:
            return { ...state, location: { latitude: action.payload.coords.latitude, longitude: action.payload.coords.longitude } };
        case GET_WEATHER:
            return { ...state, weather: { ...state.weather, weather:  action.payload.currently.icon, temperature: action.payload.currently.temperature } }
        case GET_PRETTY_LOC:
            return {...state, weather:{...state.weather, timezone: action.payload}}
        case RESET:
            return initialState
        default:
            return state;
    }
}