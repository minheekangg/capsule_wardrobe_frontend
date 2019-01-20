import axios from "axios";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API


export const getMarkers = async (lat, long)=>{
    debugger
    return (dispatch) => {
        dispatch(
            { type: "TESTING" }
        )
        return (
            axios({
            method: "get",
                baseURL: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.8670522,-74.1957362&radius=1500&keyword=donation&key=${API_KEY}`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            }).then(r=>{
                debugger;
            })
        )
    }
}
