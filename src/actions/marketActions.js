import {
  FETCHING_LISTINGS,
  FETCHED_LISTINGS,
  SELECT_LISTING,
  DESELECT_LISTING,
  POST_LISTING
} from "../types";
import axios from "axios";
import swal from "sweetalert";


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

export function postMyItem(userId, itemId, price){
    return (dispatch) => {
        dispatch({ type: FETCHING_LISTINGS });
        return axios({
          method: "post",
          baseURL: `${
            process.env.REACT_APP_API_ENDPOINT
          }/api/v1/listings`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          data: {
            listing: {
                seller_id: userId,
                item_id: itemId,
                price: price
            }
        }
        }).then(r => {
            if (r.statusText === "Created"){
            swal("Posted!", "", "success");
            dispatch({ type: POST_LISTING, payload: r.data });
            }
        })
    }

}

export function purchaseItem(listing, userId) {
    return (dispatch) => {
        dispatch({ type: FETCHING_LISTINGS });
        return axios({
            method: "patch",
            baseURL: `${
                process.env.REACT_APP_API_ENDPOINT
                }/api/v1/listings/${listing.id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data: {listing: {buyer_id: userId}}
        }).then(r => {
            if (r.statusText === "OK") {
                
                dispatch({ type: POST_LISTING, payload: r.data });
            }
    })
}

}