import { AUTH_FETCH, AUTH_FETCH_ERR, AUTH_FETCH_SUCCESS,
  LOGOUT_FETCH_SUCCESS, LOGOUT_FETCH, LOGOUT_FETCH_ERR,
  LOGIN_FETCH, LOGIN_FETCH_ERR, REG_FETCH//, AUTH_LS_FETCH_SUCCESS
} from '../actions/authenticate';

//can refactor and remove redundant types
//LOGOUT_FETCH_SUCCESS, LOGOUT_FETCH, LOGOUT_FETCH_ERR,
//LOGIN_FETCH, LOGIN_FETCH_ERR
//affects actions too

const authenticate = (state = { isLoggedIn: false, hasButtonClicked: false }, action) => {
  switch (action.type) {
    case 'AUTH_FETCH':
      return {
        ...state,
        status: 'fetching'
      }
    case 'LOGIN_FETCH':
    case 'REG_FETCH':
      return {
        ...state,
        status: 'fetching',
        hasButtonClicked: true
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
      return {
        ...state,
        status: 'success',
        message: action.message,
        isLoggedIn: true,
        authStr: action.authStr
      }
    case 'LOGOUT_FETCH_SUCCESS':
      return {
        ...state,
        status: 'success',
        message: action.message,
        isLoggedIn: false,
        authStr: ''
      }
    default:
      return state
  }
}

export default authenticate;