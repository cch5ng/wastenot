import http_requests from '../utils/http_requests';
import { getCookieStr } from '../utils/utils';

// action types
export const SETTING_FETCH = 'SETTING_FETCH';
export const SETTING_FETCH_ERR = 'SETTING_FETCH_ERR';
export const SETTING_ITEMS_MAPPED_TO_EXPIRATION_SUCCESS = 'SETTING_ITEMS_MAPPED_TO_EXPIRATION_SUCCESS';

//async
export const areItemsMappedToExpiration = ({ email, password }) => dispatch => {
    dispatch({ type: SETTING_FETCH });
    //TODO update
    //http_requests.Auth.postRegister(email, password)
      .then(resp => {
        if (resp.type === 'error') {
          dispatch({
            type: SETTING_FETCH_ERR,
            message: resp.message
          })
        } else {
          let cookieAr;
  
          if (resp.cookie && storageAvailable('sessionStorage')) {
            cookieAr = resp.cookie.split('=');
            sessionStorage.setItem(cookieAr[0], cookieAr[1]);
          }
          dispatch({
            type: SETTING_ITEMS_MAPPED_TO_EXPIRATION_SUCCESS,
            message: resp.message,
            authStr: cookieAr[1]
          })
        }
      })
      .catch(err => dispatch({
        type: SETTING_FETCH_ERR,
        message: err.message
      }))
  }