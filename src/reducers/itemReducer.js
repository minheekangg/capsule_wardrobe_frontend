import {  FETCHED_CLOSET, FETCHING_CLOSET, SELECT_ITEM, RESET, ADD_ITEM, REPLACE_ITEM } from '../types';

const initialState = {
    items: [],
    isLoaded: false,
    selectedItems: []
};


export default function itemReducer(state = initialState, action) {
    console.log("%c itemReducer", "color: purple", state, action);
    switch (action.type) {
        case ADD_ITEM:
            return {...state, items: [...state.items, action.payload]}
        case FETCHED_CLOSET:
            return { ...state, items: action.payload, isLoaded: true }
        case FETCHING_CLOSET:
            return { ...state, isLoaded: false }
        case SELECT_ITEM:
            return { ...state, selectedItems: [...state.selectedItems, state.items.find((item) => item.id === action.id)]}
        case REPLACE_ITEM:
            return { ...state, selectedItems: [...state.selectedItems.filter(s=>{return s.id !== action.payload.oldId}), state.items.find((item) => item.id === action.payload.newId)]}
        case RESET:
            return initialState
        default:
            return state;
    }
}