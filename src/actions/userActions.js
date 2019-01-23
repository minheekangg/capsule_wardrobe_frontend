import { AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, RESET, GET_LOCATION} from '../types'
// import { getMarkers } from './mapActions'
import axios from "axios";
import { GET_NEAREST_DONATION } from "../types";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

export const LoginUser = (username, password) => {
    return (dispatch) =>{
      dispatch(authenticatingUser())
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: {
              username: username,
              password: password
            }
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw response;
            }
          })
        .then(JSONResponse => {
          localStorage.setItem('jwt', JSONResponse.jwt);
          dispatch(setCurrentUser(JSONResponse.user))
          axios({
            method: "GET",
            baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/geocode?location=${JSONResponse.user.city}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              key: API_KEY
            }
          }).then(result => {
            const lat = result.data.results[0].geometry.location.lat
            const lng = result.data.results[0].geometry.location.lng
            axios({
              method: "GET",
              baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/donate?latitude=${lat}&longitude=${lng}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                key: API_KEY
              }
            }).then(result => {
              dispatch({ type: GET_NEAREST_DONATION, payload: result.data.results })
            })
          });
        })
          .catch(r =>
            r
            .json()
            .then(e =>
              dispatch(failedLogin(e.message))
              )
              );
            }
} 

export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch(authenticatingUser());
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(response => response.json())
      .then(JSONResponse => dispatch(setCurrentUser(JSONResponse.user)));
  };
}

export const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData
});

export const failedLogin = errorMsg => ({
  type: FAILED_LOGIN,
  payload: errorMsg
});

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER });

export const logout = () => {
  localStorage.removeItem('jwt')
  return { type: RESET }
}

export const SignUpUser = (username, password, city) => {
  return (dispatch) => {
    const data = { user: {username: username, password: password, city: city}}
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
     })
      .then(r=> r.json())
      .then(res=> {
        localStorage.setItem("jwt", res.jwt)
        dispatch({ type: SET_CURRENT_USER, payload: res.user})
      })
  }
}

export const getLocation = (lat, long) => ({
  type: GET_LOCATION,
  payload: { latitude: lat, longitude: long }
});
