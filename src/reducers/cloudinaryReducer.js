import { PICTURE_TO_ADD, RESET } from '../types';

const initialState = {
    tempPic: ""
};


export default function cloudinaryReducer(state = initialState, action) {
    // debugger
    console.log("inside cloudinary reducer", state, action)
    switch (action.type) {
        case PICTURE_TO_ADD:
        return { ...state, tempPic: action.payload }
        case RESET:
        return initialState
            default:
        return state;
    }
}