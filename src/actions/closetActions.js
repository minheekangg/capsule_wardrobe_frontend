import { FETCHED_CLOSET, FETCHING_CLOSET, SELECT_ITEM } from "../types";


export function fetchCloset(id){
    return (dispatch) =>{
        dispatch(
            { type: FETCHING_CLOSET }
        )
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${id}/items`)
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
