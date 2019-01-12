import { FETCHED_OUTFITS, FETCHING_OUTFITS, CREATED_OUTFIT } from "../types";

export function fetchOutfits(id) {
  return dispatch => {
      dispatch({ type: FETCHING_OUTFITS });
      return fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${id}/outfits`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
        "accept": "application/json"
      }
    })
      .then(r => r.json())
      .then(outfits => {
          dispatch({ type: FETCHED_OUTFITS, payload: outfits });
      });
  };
}

export function createOutfits(date, userId) {
  console.log(date, userId)
    return dispatch => {
        dispatch({ type: FETCHING_OUTFITS });
        return fetch(
          `${
            process.env.REACT_APP_API_ENDPOINT
          }/api/v1/users/${userId}/outfits`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              outfit: {
                user_id: userId,
                day: date
              }
            })
          })
            .then(r => {
                r.json()
            })
              .then(outfits => {
                debugger;
                dispatch({ type: CREATED_OUTFIT, payload: outfits.outfit });
              })
          }
        }
