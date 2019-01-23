import {
  FETCHED_CLOSET,
  FETCHING_CLOSET,
  SELECT_ITEM,
  RESET,
  ADD_ITEM,
  REPLACE_ITEM,
  UPDATED_ITEM,
  DESELECT_ITEM,
  SELECT_DELETE_ACTION,
  SELECT_ITEM_TO_DELETE,
  GET_NEAREST_DONATION
} from "../types";

const initialState = {
    items: [],
    loadingItems: false,
    selectedItems: [],
    isLoaded: false,
    itemToDelete: [],
    itemToDeleteStatus: "",
    addedItem: false,
    donationMarkers: []
};


export default function itemReducer(state = initialState, action) {
    console.log("%c itemReducer", "color: purple", state, action);
    let selected
    switch (action.type) {
      case ADD_ITEM:
        return { ...state, loadingItems: false, items: [...state.items, action.payload], addedItem: true };
      case FETCHED_CLOSET:
        return { ...state, items: action.payload, loadingItems: false, isLoaded: true, addedItem: false };
      case FETCHING_CLOSET:
        return { ...state, loadingItems: true, isLoaded: false, addedItem: false };
      case SELECT_ITEM:
        return { ...state, selectedItems: [...state.selectedItems, state.items.find(item => item.id === action.payload)] };
      case REPLACE_ITEM:
        selected = state.selectedItems.filter(s => {
          return s.id !== action.payload.oldId;
        });
        return { ...state, selectedItems: [...selected, state.items.find(item => item.id === action.payload.newId)] };
      case DESELECT_ITEM:
        selected = state.selectedItems.filter(e => {
          return e.id !== action.payload;
        });
        return { ...state, selectedItems: [...selected], loadingItems: false };
      case UPDATED_ITEM:
        return { ...state, items: [...state.items.filter(s => {
              return s.id !== action.payload.id;
        }), action.payload], itemToDelete: [], itemToDeleteStatus: "", selectedItems: [...state.selectedItems.filter(e => {
          return e.id !== action.payload.id
        })] };
        case SELECT_DELETE_ACTION:
        return { ...state, itemToDeleteStatus: action.payload, isLoaded: true };
        case SELECT_ITEM_TO_DELETE:
        return { ...state, itemToDelete: state.items.filter(i => i.id === action.payload) };
        case GET_NEAREST_DONATION:
        debugger
        return {...state, donationMarkers: action.payload}
      case RESET:
        return initialState;
      default:
        return state;
    }
}