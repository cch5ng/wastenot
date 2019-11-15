import { AUTH_FETCH, AUTH_FETCH_ERR, AUTH_FETCH_SUCCESS
 } from '../actions/authenticate';

const authenticate = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    // case 'REMOVE_TOKEN':
    //   return {
    //     ...state,
    //     token: null
    //   }

    case 'AUTH_FETCH':
      return {
        ...state,
        status: 'fetching'
      }
    case 'AUTH_FETCH_ERR':
      return {
        ...state,
        status: 'error',
        message: action.message
      }
    case 'AUTH_FETCH_SUCCESS':
      console.log('gets here reducers')
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