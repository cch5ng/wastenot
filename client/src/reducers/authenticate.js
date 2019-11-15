import { SET_AUTH, REMOVE_AUTH, SET_TOKEN, REMOVE_TOKEN } from '../actions/authenticate';

const authenticate = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    // case 'SET_AUTH':
    //   return {
    //     ...state,
    //     isLoggedIn: true
    //   }
    // case 'REMOVE_AUTH':
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     token: null
    //   }
    // case 'SET_TOKEN':
    //   return {
    //     ...state,
    //     token: action.token
    //   }
    // case 'REMOVE_TOKEN':
    //   return {
    //     ...state,
    //     token: null
    //   }

    case: AUTH_FETCH:
      return {
        ...state,
        status: 'fetching'
      }
    case: AUTH_FETCH_ERR:
      return {
        ...state,
        status: 'error',
        message: action.message
      }
    case: AUTH_FETCH_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        isLoggedIn: true
      }
    default:
      return state
  }
}

export default authenticate;