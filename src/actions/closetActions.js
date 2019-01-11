import { FETCHED_CLOSET, FETCHING_CLOSET, SELECT_ITEM, ADD_ITEM } from "../types";


export function fetchCloset(id){
    return (dispatch) =>{
        dispatch(
            { type: FETCHING_CLOSET }
        )
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${id}/items`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
          .then(r => r.json())
          .then(items => {
            dispatch({ type: FETCHED_CLOSET, payload: items });
          });
    }
}
export function selectThisItem(id) {
    return {
        type: SELECT_ITEM,
        id: id
    }
}

export function addItem(name, image, catId, userId) {
    debugger
    return (dispatch) => {
        dispatch(
            { type: FETCHING_CLOSET }
        )
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${userId}/items`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                item: { name: name,
                        image: image,
                        category_id: catId,
                        user_id: userId
                }
            })
        })
        .then(r => r.json())
        .then(item => {
                dispatch({ type: ADD_ITEM, payload: item });
        });
    }
}