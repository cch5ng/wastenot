import http_requests from '../utils/http_requests';
import { getCookieStr } from '../utils/utils';

// action types
export const SETTING_FETCH = 'SETTING_FETCH';
export const SETTING_FETCH_ERR = 'SETTING_FETCH_ERR';
export const SETTING_FETCH_SUCCESS = 'SETTING_FETCH_SUCCESS';

//async
export const isUsingExpiration = ({cookieStr}) => dispatch => {
    dispatch({ type: SETTING_FETCH });
    if (cookieStr) {
      //TODO http get/post request
      http_requests.Setting.postListItemMapSetting(cookieStr)
        .then(resp => {
          if (resp.type === 'error') {
            dispatch({
              type: SETTING_FETCH_ERR,
              message: resp.message
            })
          } else {
            dispatch({
              type: SETTING_FETCH_SUCCESS,
              message: resp.message,
              isUsingExpiration: resp.mapped_items_to_categories
            })
          }
        })
        .catch(err => dispatch({
          type: SETTING_FETCH_ERR,
          message: err.message
        }))
    } else {
      dispatch({
        type: SETTING_FETCH_ERR,
        message: 'settings could not be retrieve; auth issue'
      })
    }
  }
