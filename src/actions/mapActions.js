import axios from "axios";
import { GET_NEAREST_DONATION } from "../types";
// const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API

export function getMarkers(lat, long){
    return dispatch => {
        axios({
            method: "GET",
            baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/donate`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }).then(result => {
                dispatch({type: GET_NEAREST_DONATION, payload: result.data.results})
        })
        }
}
// export function getMarkers(lat, long){
//     console.log(lat, long)
//     debugger
//     return (dispatch) => {
//             axios({
//             method: "get",
//                 baseURL: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.8670522,-74.1957362&radius=1500&keyword=donation&key=${API_KEY}`,
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 "Access-Control-Allow-Origin": "*"}
//             }).then(r=>{
//                 debugger;
//             })
//     }
// }
// export const getMarkers = async (lat, long)=>{
//     debugger
//     return (dispatch) => {
//         dispatch(
//             { type: "TESTING" }
//         )
//         return (
//             axios({
//             method: "get",
//                 baseURL: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.8670522,-74.1957362&radius=1500&keyword=donation&key=${API_KEY}`,
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 "Access-Control-Allow-Origin": "*"
//             },
//             }).then(r=>{
//                 debugger;
//             })
//         )
//     }
// }
