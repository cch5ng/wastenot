import http_requests from '../utils/http_requests';
import { getCookieStr, arrayToObj } from '../utils/utils';

export const SHOPPING_LISTS_FETCH = 'SHOPPING_LISTS_FETCH';
export const SHOPPING_LISTS_ERR = 'SHOPPING_LISTS_ERR';
export const SHOPPING_LISTS_FETCH_SUCCESS = 'SHOPPING_LISTS_FETCH_SUCCESS';
export const SHOPPING_LISTS_EDIT_FETCH_SUCCESS = 'SHOPPING_LISTS_EDIT_FETCH_SUCCESS';

// async action for getting posts
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

// async action for getting posts
export const fetchShoppingListEdit = ({ list, cookieStr }) => dispatch => {
  dispatch({ type: SHOPPING_LISTS_FETCH });

  if (cookieStr) {
    http_requests.Lists.putTemplateList({ list, cookieStr })
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


// export function receiveListCreate(listObj) {

//   let normListObj = {};
//   let listId = listObj.listId;
//   normListObj[listId] = listObj;

//   return {
//     type: RECEIVE_ADD_LIST,
//     normListObj,
//     retrieving: false
//   }
// }

// async action for getting posts
export const fetchShoppingListCreate = ({ list, cookieStr }) => dispatch => {
  dispatch({ type: SHOPPING_LISTS_FETCH});

  if (cookieStr) {
    http_requests.Lists.postShoppingList({ list, cookieStr })
      .then(response => response.json())
      // use json.posts to make the data more shallow
      .then(json => dispatch({
        type: SHOPPING_LISTS_FETCH_SUCCESS,
        message: action.message,
        shoppingLists: json.shoppingLists
      }))
      .catch(function(err) {
        dispatch({ type: SHOPPING_LISTS_ERR, message: action.message })
        console.log('fetch err: ' + err.message)
      })
  }
}

/////

// section for edit Post action
// export const REQUEST_EDIT_LIST = 'REQUEST_EDIT_LIST'
// export const RECEIVE_EDIT_LIST = 'RECEIVE_EDIT_LIST'

// export function requestListEdit() {
//   return {
//     type: REQUEST_EDIT_LIST,
//     retrieving: true
//   }
// }

// export function receiveListEdit(listObj) {
//   let normListObj = {}
//   let listId = listObj.listId
//   normListObj[listId] = listObj

//   return {
//     type: RECEIVE_EDIT_LIST,
//     normListObj,
//     retrieving: false
//   }
// }

// async action for editing a post
// export const fetchListEdit = (postId, postData) => dispatch => {
//   dispatch(requestPostEdit())
//   let INIT_EDIT_POST = {method: 'PUT',
//                           headers: {
//                             'Authorization': 'mAuth',
//                             "Content-Type": 'application/json'
//                           },
//                           body: JSON.stringify(postData)
//                         }

//   return fetch(`${API_GET_POSTS}/${postId}`, INIT_EDIT_POST)
//     .then(response => response.json())
//     // use json.posts to make the data more shallow
//     .then(json => dispatch(receivePostEdit(json)))
//     .catch(function(err) {
//       console.log('fetch err: ' + err.message)
//     })
// }

//////

// section for delete Post action
// export const REQUEST_DELETE_LIST = 'REQUEST_DELETE_LIST'
// export const RECEIVE_DELETE_LIST = 'RECEIVE_DELETE_LIST'

// export function requestListDelete() {
//   return {
//     type: REQUEST_DELETE_LIST,
//     retrievingDeletePost: true
//   }
// }

// export function receiveListDelete(listId) {
//   return {
//     type: RECEIVE_DELETE_LIST,
//     retrievingDeleteList: false,
//     listId
//   }
// }

// async action for editing a post
// export const fetchListDelete = (postId) => dispatch => {
//   dispatch(requestPostDelete())
//   let INIT_EDIT_POST = {method: 'DELETE',
//                           headers: {
//                             'Authorization': 'mAuth',
//                             "Content-Type": 'application/json'
//                           }
//                         }

//   return fetch(`${API_GET_POSTS}/${postId}`, INIT_EDIT_POST)
//     .then(() => dispatch(receivePostDelete(postId)))
//     .catch(function(err) {
//       console.log('fetch err: ' + err.message)
//     })
// }