import { SHOPPING_LISTS_FETCH, SHOPPING_LISTS_ERR,
  SHOPPING_LISTS_FETCH_SUCCESS, SHOPPING_LISTS_EDIT_FETCH_SUCCESS,
  SHOPPING_LISTS_ADD_FETCH_SUCCESS, SHOPPING_LISTS_DELETE_FETCH_SUCCESS } from '../actions/shoppingLists';

const shoppingLists = (state = {}, action) => {
  let listObj = {};
  let id;
  switch(action.type) {
    case SHOPPING_LISTS_FETCH:
      return {
        ...state,
        status: 'fetching'
      }
    case SHOPPING_LISTS_ERR:
      return {
        ...state,
        status: 'error',
        message: action.message
      }
    case SHOPPING_LISTS_FETCH_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        shoppingLists: action.shoppingLists
      }
    case SHOPPING_LISTS_ADD_FETCH_SUCCESS:
      id = Object.keys(action.shoppingList)[0];
      return {
        ...state,
        status: 'success',
        message: action.message,
        shoppingLists: {...state.shoppingLists, [id]: action.shoppingList}
      }
    case SHOPPING_LISTS_EDIT_FETCH_SUCCESS:
      id = action.shoppingList.guid;
      return {
        ...state,
        status: 'success',
        message: action.message,
        shoppingLists: {...state.shoppingLists, [id]: action.shoppingList}
      }
    case SHOPPING_LISTS_DELETE_FETCH_SUCCESS:
      let updatedShoppingLists = {...state.shoppingLists};
      let deletedGuid = action.deletedGuid;
      delete updatedShoppingLists[deletedGuid];
      return {
        ...state,
        status: 'success',
        message: action.message,
        shoppingLists: updatedShoppingLists
      }
    default:
      return state;
  }
}

export default shoppingLists;
