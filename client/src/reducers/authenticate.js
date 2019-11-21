import { AUTH_FETCH, AUTH_FETCH_ERR, AUTH_FETCH_SUCCESS,
  LOGOUT_FETCH_SUCCESS, LOGOUT_FETCH, LOGOUT_FETCH_ERR,
  LOGIN_FETCH_SUCCESS, LOGIN_FETCH, LOGIN_FETCH_ERR
} from '../actions/authenticate';

const authenticate = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    // case 'REMOVE_TOKEN':
    //   return {
    //     ...state,
    //     token: null
    //   }

    case 'AUTH_FETCH':
    case 'LOGOUT_FETCH':
    case 'LOGIN_FETCH':
      return {
        ...state,
        status: 'fetching'
      }
    case 'AUTH_FETCH_ERR':
    case 'LOGOUT_FETCH_ERR':
    case 'LOGIN_FETCH_ERR':
      return {
        ...state,
        status: 'error',
        message: action.message
      }
    case 'AUTH_FETCH_SUCCESS':
    case 'LOGIN_FETCH_SUCCESS':
      return {
        ...state,
        status: 'success',
        message: action.message,
        isLoggedIn: true
      }
    case 'LOGOUT_FETCH_SUCCESS':
      return {
        ...state,
        status: 'success',
        message: action.message,
        isLoggedIn: false
      }
    default:
      return state
  }
}

export default authenticate;