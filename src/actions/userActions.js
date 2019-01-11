import {AUTHENTICATING_USER, SET_CURRENT_USER} from '../types'

export const LoginUser = (username, password) => {
    return (dispatch) =>{
        dispatch({ type: AUTHENTICATING_USER })
        fetch(`http://localhost:3000/api/v1/login`, {
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
            localStorage.setItem("jwt", JSONResponse.jwt);
            dispatch({
              type: SET_CURRENT_USER,
              payload: JSONResponse.user
            });
          })
          .catch(r =>
            r
              .json()
              .then(e =>
                dispatch({ type: "FAILED_LOGIN", payload: e.message })
              )
          );
    }
} 