import {
    FETCHING_LISTINGS,
    FETCHED_LISTINGS,
    SELECT_LISTING,
    DESELECT_LISTING
} from "../types";
// import axios from "axios";

export function fetchListings() {
    return (dispatch) => {
        dispatch({ type: FETCHING_LISTINGS });
        return fetch(
            `${
            process.env.REACT_APP_API_ENDPOINT
            }/api/v1/listings`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "content-type": "application/json",
                    accept: "application/json"
                }
            }
        )
            .then(r => r.json())
            .then(listings => {
                dispatch({
                  type: FETCHED_LISTINGS,
                  payload: listings
                });
            }); 
    }
}

//TODO: NEED TO FILTER THROOUGH WHATS MINE
export function selectListing(itemId){
    return (dispatch) => {
        dispatch({ type: SELECT_LISTING, payload: itemId });
    }
}

export function deselect(){
    return dispatch => {
      dispatch({ type: DESELECT_LISTING});
    };
}