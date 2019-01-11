import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import itemReducer from './itemReducer';
import cloudinaryReducer from './cloudinaryReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    user: userReducer,
    closet: itemReducer,
    cloudinary: cloudinaryReducer,
    category: categoryReducer
})