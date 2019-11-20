import http_requests from '../utils/http_requests';

// action types
export const AUTH_FETCH = 'AUTH_FETCH';
export const AUTH_FETCH_ERR = 'AUTH_FETCH_ERR';
export const AUTH_FETCH_SUCCESS = 'AUTH_FETCH_SUCCESS';

export const LOGOUT_FETCH = 'LOGOUT_FETCH';
export const LOGOUT_FETCH_ERR = 'LOGOUT_FETCH_ERR';
export const LOGOUT_FETCH_SUCCESS = 'LOGOUT_FETCH_SUCCESS';

//async
export const register = ({ email, password }) => dispatch => {
  dispatch({ type: AUTH_FETCH });
  http_requests.Auth.postRegister(email, password)
    .then(resp => {
      if (resp.type === 'error') {
        dispatch({
          type: AUTH_FETCH_ERR,
          message: resp.message
        })
      } else {
        dispatch({
          type: AUTH_FETCH_SUCCESS,
          message: resp.message
        })
      }
    })
    .catch(err => dispatch({
      type: AUTH_FETCH_ERR,
      message: err.message
    }))
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_FETCH });
  http_requests.Auth.getLogout()
    .then(resp => {
      if (resp.type === 'error') {
        dispatch({
          type: LOGOUT_FETCH_ERR,
          message: resp.message
        })
      } else {
        dispatch({
          type: LOGOUT_FETCH_SUCCESS,
          message: resp.message
        })
        
      }
    })
    .catch(err => dispatch({
      type: LOGOUT_FETCH_ERR,
      message: err.message
    }))
}

//TODO refactor
// export function fetchAuthLogin(email, password) {
//   fetchAuth();
//   http_requests.Auth.postLogin(email, password)
//     .then(resp => resp.json())
//     .then(json => fetchAuthSuccess(json))
//     .catch(err => fetchAuthErr(err))
// }



///////// OLD

export const SET_AUTH = 'SET_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';

export function setAuthenticated() {
  return {
    type: SET_AUTH,
    retrieving: false,
  };
}

export function setNotAuthenticated() {
  return {
    type: REMOVE_AUTH,
    retrieving: false,
  };
}

export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
    retrieving: false,
  };
}

export function removeToken() {
  return {
    type: REMOVE_TOKEN,
    retrieving: false,
  };
}



  //move to action
// export const checkAuthentication = (fn) => (dispatch, fn) => {
//   dispatch(requestAuthentication());
//   //const authenticated = await fn(); //this.props.auth.isAuthenticated();
//   fn()
//     .then(authenticated => {
//       console.log('authenticated', authenticated);
//       dispatch(receiveAuthentication(authenticated));
//     })
//     .catch(err => console.error('err', err))

//   //if (authenticated !== this.state.authenticated) {
//     //this.setState({ authenticated });
//   //}
// }

// export const fetchQuestions = () => dispatch => {
//   dispatch(requestAllQuestions());
//   return http_requests.Questions.getAll()
//     .then(json => dispatch(receiveAllQuestions(json)))
//     .catch(err => console.error('fetch error', err));
// };