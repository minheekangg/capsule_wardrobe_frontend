import { FETCHED_OUTFITS, FETCHING_OUTFITS, CREATED_OUTFIT } from "../types";

export function fetchOutfits(id) {
  return dispatch => {
      dispatch({ type: FETCHING_OUTFITS });
      return fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${id}/outfits`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(r => r.json())
      .then(outfits => {
          dispatch({ type: FETCHED_OUTFITS, payload: outfits });
      });
  };
}

export function createOutfits(date, userId) {
    // return dispatch => {
    //     dispatch({ type: FETCHING_OUTFITS });
    //     return fetch(
    //       `${
    //         process.env.REACT_APP_API_ENDPOINT
    //       }/api/v1/users/${userId}/outfits`,
    //       {
    //         method: "POST",
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("jwt")}`
    //         },
    //         body: JSON.stringify({
    //           outfit: {
    //             user_id: userId,
    //             day: date
    //           }
    //         })
    //           .then(r => {
    //             debugger;
    //           })
    //           .then(outfits => {
    //             debugger;
    //             dispatch({ type: CREATED_OUTFIT, payload: outfits });
    //           })
    //       }
    //     );
    // }
}
