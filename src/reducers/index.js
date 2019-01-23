import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import itemReducer from './itemReducer';
import categoryReducer from './categoryReducer';
import outfitReducer from './outfitReducer';
import marketReducer from './marketReducer';
import donationReducer from './donationReducer';

export default combineReducers({
    user: userReducer,
    closet: itemReducer,
    outfit: outfitReducer,
    category: categoryReducer,
    market: marketReducer,
    donation: donationReducer
})