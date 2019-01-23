import {
  FETCHED_CLOSET,
  FETCHING_CLOSET,
  SELECT_ITEM,
  ADD_ITEM,
  REPLACE_ITEM,
  UPDATED_ITEM,
  DESELECT_ITEM,
    SELECT_DELETE_ACTION, SELECT_ITEM_TO_DELETE
} from "../types";
import axios from "axios";

export function fetchCloset(id){
    return (dispatch) =>{
        dispatch(
            { type: FETCHING_CLOSET }
        )
        return fetch(
          `${
            process.env.REACT_APP_API_ENDPOINT
          }/api/v1/users/${id}/items`,
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
          .then(items => {
            dispatch({ type: FETCHED_CLOSET, payload: items.filter((e=> e.current_status=== "closet")) });
          });
    }
}
export function selectThisItem(id) {
    return {
        type: SELECT_ITEM,
        payload: id
    }
}

export function deselectThisItem(id) {
    return (dispatch) => {
        dispatch(
            { type: DESELECT_ITEM,
            payload: id
            })
    }
}
export function replaceSelectedItem(newId, oldId) {
    return { type: REPLACE_ITEM, payload: {newId: newId, oldId: oldId} };
       }

export function addItem(name, image, catId, userId) {
    return (dispatch) => {
        dispatch(
            { type: FETCHING_CLOSET }
            )
        return axios({
            method: "post",
            baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${userId}/items`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            data: {
                item: {
                    name: name,
                    image: image,
                    category_id: catId,
                    user_id: userId
                }
            }
        })
            .then(r => {
                if (r.statusText === "Created") {
                    dispatch({ type: ADD_ITEM, payload: r.data });
                }
            })

    }
}
export function increaseTimesWorn(itemsArr, userId) {
    return dispatch => {
        dispatch({ type: FETCHING_CLOSET })
        itemsArr.forEach((i)=> {
        return axios({
            method: "patch",
            baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${userId}/items/${i.id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: { item: {times_worn: (i.times_worn + 1)}}
        }).then(r => {
            if (r.statusText === "Created") {
                dispatch({ type: UPDATED_ITEM, payload: r.data })
            }
        })
    })
}
}

export function selectItemToDelete(id){
        return dispatch => {
            dispatch({
                type: SELECT_ITEM_TO_DELETE,
                payload: id
            })
        }
    }

export function selectItemStatus(status){
    return dispatch => dispatch({ type: SELECT_DELETE_ACTION, payload: status })
}
   

export function changeItemStatus(userId, id, newStatus){
    return (dispatch) => {
        dispatch(
            { type: FETCHING_CLOSET }
        )
        return axios({
          method: "patch",
          baseURL: `${
            process.env.REACT_APP_API_ENDPOINT
          }/api/v1/users/${userId}/items/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: {
            item: {
              current_status: newStatus
            }
          }
        }).then(r => {
          if (r.statusText === "OK") {
            dispatch({ type: UPDATED_ITEM, payload: r.data });
          }
        });
    }

}