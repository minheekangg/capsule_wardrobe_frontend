import {AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, RESET} from '../types'

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
          dispatch(setCurrentUser(JSONResponse.user))})
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

export const SignUpUser = (username, password, city, image) => {
  return (dispatch) => {
    const data = { user: {username: username, password: password, city: city, image: image}}
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
        debugger
        dispatch({ type: SET_CURRENT_USER, payload: res.user})
      })
  }
}