import {  FETCHED_CLOSET, FETCHING_CLOSET, SELECT_ITEM, RESET, ADD_ITEM, REPLACE_ITEM, INCREASE_TIMES_WORN, DESELECT_ITEM } from '../types';

const initialState = {
    items: [],
    loadingItems: false,
    selectedItems: [],
    isLoaded: false
};


export default function itemReducer(state = initialState, action) {
    console.log("%c itemReducer", "color: purple", state, action);
    let selected
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, loadingItems: false, items: [...state.items, action.payload], isLoaded: true };
        case FETCHED_CLOSET:
            return { ...state, items: action.payload, loadingItems: false, isLoaded: true };
        case FETCHING_CLOSET:
            return { ...state, loadingItems: true, isLoaded: false };
        case SELECT_ITEM:
            return { ...state, selectedItems: [...state.selectedItems, state.items.find((item) => item.id === action.payload)]}
        case REPLACE_ITEM:
            selected = state.selectedItems.filter(s => { return s.id !== action.payload.oldId })
            return { ...state, selectedItems: [...selected, state.items.find((item) => item.id === action.payload.newId)]}
        case DESELECT_ITEM:
            selected = state.selectedItems.filter((e) => { return e.id !== action.payload })
            return { ...state, selectedItems: [...selected], loadingItems: false}
        case INCREASE_TIMES_WORN:
            return { ...state, items: [...state.items.filter(s => { return s.id !== action.payload.id }), action.payload ] }
        case RESET:
            return initialState
        default:
            return state;
    }
}