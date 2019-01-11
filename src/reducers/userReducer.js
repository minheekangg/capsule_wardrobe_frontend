import { SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, RESET } from "../types";

const initialState = {
    username: "",
    userId: 0,
    city: "",
    image: "",
    isLoggedIn: false,
    authenticatingUser: false,
    failedLogin: false,
    error: null
};


export default function userReducer(state = initialState, action) {
    console.log('%c userReducer', 'color: blue', state, action);
    switch (action.type) { 
        case SET_CURRENT_USER:
            return {...state, username: action.payload.username, userId: action.payload.id, image: action.payload.image, city: action.payload.city, isLoggedIn: true, authenticatingUser: false}
        case AUTHENTICATED_USER:
            return {...state, authenticatingUser: false}
        case AUTHENTICATING_USER:
            return {...state, authenticatingUser: true}
        case FAILED_LOGIN:
            return {
                ...state,
                failedLogin: true,
                error: action.payload,
                authenticatingUser: false}
        case RESET:
            return initialState
        default:
            return state;
    }
}