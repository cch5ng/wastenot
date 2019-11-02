import { SET_AUTH, REMOVE_AUTH, SET_TOKEN, REMOVE_TOKEN } from '../actions/authenticate';

const authenticate = (state = { isLoggedIn: false, token: null }, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isLoggedIn: true
      }
    case 'REMOVE_AUTH':
      return {
        ...state,
        isLoggedIn: false,
        token: null
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      }
    case 'REMOVE_TOKEN':
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}

export default authenticate;