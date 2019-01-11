import { FETCHED_CATEGORY, FETCHING_CATEGORY, RESET } from '../types';

const initialState = {
  category: [],
  isCatLoading: false
};


export default function itemReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHED_CATEGORY:
        return { ...state, category: action.payload, isCatLoading: false };
      case FETCHING_CATEGORY:
        return { ...state, isCatLoading: true };
      case RESET:
        return initialState;
      default:
        return state;
    }
}