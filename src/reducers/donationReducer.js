import { GET_NEAREST_DONATION, GETTING_DONATIONS, RESET} from "../types";

const initialState = {
    donationMarkers: [],
    donationLoading: false
};


export default function donationReducer(state = initialState, action) {
    console.log("%c donationReducer", "color: teal", state, action);
    switch (action.type) {
      case GET_NEAREST_DONATION:
        return { ...state, donationMarkers: action.payload, donationLoading: false}
      case GETTING_DONATIONS:
        return {donationLoading: true}
      case RESET:
        return initialState;
      default:
        return state;
    }
}