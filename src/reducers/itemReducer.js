import {  FETCHED_CLOSET, FETCHING_CLOSET, SELECT_ITEM, RESET } from '../types';

const initialState = {
    items: [],
    isLoaded: false,
    selectedItems: []
};


export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHED_CLOSET:
            return { ...state, items: action.payload, isLoaded: true }
        case FETCHING_CLOSET:
            return { ...state, isLoaded: false }
        case SELECT_ITEM:
            return { ...state, selectedItems: [...state.selectedItems, state.items.find((item) => item.id === action.id)]}
        case RESET:
            return initialState
        default:
            return state;
    }
}