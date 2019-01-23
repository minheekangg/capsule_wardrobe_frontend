import {
  FETCHED_OUTFITS,
  CREATING_OUTFITS,
  CREATED_OUTFIT,
  UPDATED_OUTFITS,
  GET_WEATHER,
  GET_PRETTY_LOC
} from "../types";
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

export const createOutfits = (date, userId, itemsArr, weather) => {
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
              day: date,
              weather: weather.weather,
              location: weather.timezone,
              temperature: weather.temperature
            }
          }
        })
        .then(r =>  {
          if (r.statusText === "Created"){
            const newOutfitId = r.data.id 
            return addItemsToOutfit(newOutfitId, currItemArr);
          }
        }).then(r => {
          dispatch({ type: CREATED_OUTFIT })
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
}

export const faveOutfit = (userId, id, favorite) => {

  return dispatch => {
    dispatch({ type: CREATING_OUTFITS });
    return (
      axios({
        method: "PATCH",
        baseURL: `${
          process.env.REACT_APP_API_ENDPOINT
          }/api/v1/users/${userId}/outfits/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          outfit: {
            favorite: !favorite
          }
        }
      })
    )
      .then(outfits => {
        dispatch({ type: UPDATED_OUTFITS, payload: outfits.data });
      })
  };
} 

export function fetchWeather(latitude, longitude, date){
  const currentDate= (date/1000).toFixed(0)
  return dispatch=> {
    axios({
      method: "GET",
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/weather?latitude=${latitude}&longitude=${longitude}&date=${currentDate}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json"}
      })
      .then(weather => {
        dispatch({ type: GET_WEATHER, payload: weather.data });
      })
  }
}


export function fetchPrettyLocation(lat, long) {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API
  return dispatch => {
    dispatch({ type: CREATING_OUTFITS });
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    params: {
      latlng: `${lat},${long}`,
      key: API_KEY
    }
  }).then(r => {
    dispatch({
      type: GET_PRETTY_LOC,
      payload: r.data.results[6].formatted_address
    });
  })
  .catch(error => {
    console.log(error)
  // })
  // debugger
  // return dispatch => {
  //   axios({
  //     method: "GET",
  //     baseURL: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`,
  //     headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       }
  //     }).then(r => {
  //       debugger
  //   });
})
}

}