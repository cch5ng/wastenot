import http_requests from '../utils/http_requests';

// action types
export const AUTH_FETCH = 'AUTH_FETCH';
export const AUTH_FETCH_ERR = 'AUTH_FETCH_ERR';
export const AUTH_FETCH_SUCCESS = 'AUTH_FETCH_SUCCESS';

export const LOGIN_FETCH = 'LOGIN_FETCH';
export const LOGIN_FETCH_ERR = 'LOGIN_FETCH_ERR';
export const LOGIN_FETCH_SUCCESS = 'LOGIN_FETCH_SUCCESS';

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
        if (resp.cookie && storageAvailable('sessionStorage')) {
          let cookieAr = resp.cookie.split('=');
          sessionStorage.setItem(cookieAr[0], cookieAr[1]);
        }
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

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_FETCH });
  http_requests.Auth.postLogin(email, password)
    .then(resp => {
      if (resp.type === 'error') {
        dispatch({
          type: LOGIN_FETCH_ERR,
          message: resp.message
        })
      } else {
        if (resp.cookie && storageAvailable('sessionStorage')) {
          let cookieAr = resp.cookie.split('=');
          sessionStorage.setItem(cookieAr[0], cookieAr[1]);
        }
        dispatch({
          type: LOGIN_FETCH_SUCCESS,
          message: resp.message
        })
      }
    })
    .catch(err => dispatch({
      type: LOGIN_FETCH_ERR,
      message: err.message
    }))
}

export const logout = () => dispatch => {
  let cookie;
  const cookieKey = 'sessionStr';
  let cookieVal = sessionStorage.getItem(cookieKey);
  cookie = `${cookieKey}=${cookieVal}`;

  dispatch({ type: LOGOUT_FETCH });
  http_requests.Auth.postLogout({ cookie })
    .then(resp => {
      if (resp.type === 'error') {
        dispatch({
          type: LOGOUT_FETCH_ERR,
          message: resp.message
        })
      } else {
        sessionStorage.removeItem(`${cookieKey}`);
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

//helper
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

//TODO refactor
// export function fetchAuthLogin(email, password) {
//   fetchAuth();
//   http_requests.Auth.postLogin(email, password)
//     .then(resp => resp.json())
//     .then(json => fetchAuthSuccess(json))
//     .catch(err => fetchAuthErr(err))
// }
