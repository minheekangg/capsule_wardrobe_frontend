// import axios from "axios";
// import { GET_NEAREST_DONATION } from "../types";
// const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API

// export function getMarkers(address){
//       axios({
//         method: "GET",
//         baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/geocode?location=${address}`,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           "Content-Type": "application/json",
//             Accept: "application/json",
//             key: API_KEY
//         }
//       }).then(result => {
//           const lat = result.data.results[0].geometry.location.lat
//           const lng = result.data.results[0].geometry.location.lng
//               axios({
//                   method: "GET",
//                   baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/donate?latitude=${lat}&longitude=${lng}`,
//                   headers: {
//                       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//                       "Content-Type": "application/json",
//                       Accept: "application/json",
//                       key: API_KEY
//                   }
//               }).then(result => {
//                   debugger
//                       dispatch({type: GET_NEAREST_DONATION, payload: result.data.results})
//               })
//       });
//         }
