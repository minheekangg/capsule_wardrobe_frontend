import { FETCHED_CLOSET, FETCHING_CLOSET, SELECT_ITEM, ADD_ITEM, REPLACE_ITEM, INCREASE_TIMES_WORN } from "../types";
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
                    alert("added!")
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
                dispatch({ type: INCREASE_TIMES_WORN, payload: r.data })
            }
        })
    })
}
}
   