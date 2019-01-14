import { FETCHED_OUTFITS, CREATING_OUTFITS, CREATED_OUTFIT } from "../types";
import axios from 'axios'

export function fetchOutfits(id) {
  return dispatch => {
      dispatch({ type: CREATING_OUTFITS });
    return (
      axios({
        method: "GET",
        baseURL: `${
          process.env.REACT_APP_API_ENDPOINT
        }/api/v1/users/${id}/outfits`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
    )
        .then(outfits => {
          dispatch({ type: FETCHED_OUTFITS, payload: outfits.data });
        })
  };
}

export const createOutfits = (date, userId, itemsArr) => {
  console.log(date, userId, itemsArr)
  const currItemArr = itemsArr
    return dispatch => {
     dispatch({ type: CREATING_OUTFITS });
      return axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${userId}/outfits`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: {
          outfit: {
            user_id: userId,
            day: date
          }
        }
      })
      .then(r =>  {
        if (r.statusText === "Created"){
          alert("created!")
          const newOutfitId = r.data.id 
          return addItemsToOutfit(newOutfitId, currItemArr);
        }
      })
    }
}
      
export const addItemsToOutfit= (outfitId, itemArr) => {
  itemArr.forEach(e=>{
    return axios({
      method: "post",
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/ootds`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        ootd: {
          outfit_id: outfitId,
          item_id: e.id
        }
      }
    })
  })
  return (dispatch) => {
    debugger
    dispatch({TYPE: CREATED_OUTFIT})
  }
}


