import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import itemReducer from './itemReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    user: userReducer,
    closet: itemReducer,
    category: categoryReducer
})