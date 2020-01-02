import http_requests from '../utils/http_requests';
import { getCookieStr, arrayToObj } from '../utils/utils';

export const SHOPPING_LISTS_FETCH = 'SHOPPING_LISTS_FETCH';
export const SHOPPING_LISTS_ERR = 'SHOPPING_LISTS_ERR';
export const SHOPPING_LISTS_FETCH_SUCCESS = 'SHOPPING_LISTS_FETCH_SUCCESS';
export const SHOPPING_LISTS_ADD_FETCH_SUCCESS = 'SHOPPING_LISTS_ADD_FETCH_SUCCESS';
export const SHOPPING_LISTS_EDIT_FETCH_SUCCESS = 'SHOPPING_LISTS_EDIT_FETCH_SUCCESS';
export const SHOPPING_LISTS_DELETE_FETCH_SUCCESS = 'SHOPPING_LISTS_DELETE_FETCH_SUCCESS';

export const fetchShoppingLists = ({ cookieStr }) => dispatch => {
  dispatch({ type: SHOPPING_LISTS_FETCH });

  if (cookieStr) {
    http_requests.Lists.getAllShoppingLists({ cookieStr })
      .then(response => {
        if (response.shoppingLists) {
          let shoppingListsObj = arrayToObj(response.shoppingLists);
          dispatch(
            { type: SHOPPING_LISTS_FETCH_SUCCESS,
              message: response.message,
              shoppingLists: shoppingListsObj
            }
          )
        }
      })
      .catch(function(err) {
        dispatch({ type: SHOPPING_LISTS_ERR, message: err.message});
        console.log('fetch err: ' + err.message)
      })
  }
}

export const fetchShoppingListCreate = ({ list, cookieStr }) => dispatch => {
  dispatch({ type: SHOPPING_LISTS_FETCH});

  if (cookieStr) {
    http_requests.Lists.postShoppingList({ list, cookieStr })
      .then(response => {
        if (response.type === 'success') {
          dispatch({
            type: SHOPPING_LISTS_ADD_FETCH_SUCCESS,
            message: response.message,
            shoppingList: response.shoppingList
          })
        }
      })
      .catch(function(err) {
        dispatch({ type: SHOPPING_LISTS_ERR, message: action.message })
        console.log('fetch err: ' + err.message)
      })
  }
}

export const fetchShoppingListEdit = ({ list, cookieStr }) => dispatch => {
  dispatch({ type: SHOPPING_LISTS_FETCH });

  if (cookieStr) {
    http_requests.Lists.putShoppingList({ list, cookieStr })
      .then(response => {
        if (response.type === 'success') {
          //let shoppingListsObj = arrayToObj(response.templateList);
          dispatch(
            { type: SHOPPING_LISTS_EDIT_FETCH_SUCCESS,
              message: response.message,
              shoppingList: list
            }
          )
        }
      })
      .catch(function(err) {
        dispatch({ type: SHOPPING_LISTS_ERR, message: err.message});
        console.log('fetch err: ' + err.message)
      })
  }
}

export const fetchShoppingListDelete = ({ guid, cookieStr }) => dispatch => {
  dispatch({ type: SHOPPING_LISTS_FETCH });

  if (cookieStr) {
    http_requests.Lists.deleteTemplateList({ guid, cookieStr })
      .then(response => {
        if (response.type === 'success') {
          //let shoppingListsObj = arrayToObj(response.templateList);
          dispatch(
            { type: SHOPPING_LISTS_DELETE_FETCH_SUCCESS,
              message: response.message,
              deletedGuid: response.guid
            }
          )
        }
      })
      .catch(function(err) {
        dispatch({ type: SHOPPING_LISTS_ERR, message: err.message});
        console.log('fetch err: ' + err.message)
      })
  }
}
