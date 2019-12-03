import http_requests from '../utils/http_requests';
import { getCookieStr } from '../utils/utils';

// action types
export const TEMPLATE_LISTS_FETCH = 'TEMPLATE_LISTS_FETCH';
export const TEMPLATE_LISTS_FETCH_ERR = 'TEMPLATE_LISTS_FETCH_ERR';
export const TEMPLATE_LISTS_FETCH_SUCCESS = 'TEMPLATE_LISTS_FETCH_SUCCESS';


// action types
export const SHOPPING_LISTS_FETCH = 'SHOPPING_LISTS_FETCH';
export const SHOPPING_LISTS_FETCH_ERR = 'SHOPPING_LISTS_FETCH_ERR';
export const SHOPPING_LISTS_FETCH_SUCCESS = 'SHOPPING_LISTS_FETCH_SUCCESS';

// export const REQUEST_TEMPLATE_LISTS = 'REQUEST_TEMPLATE_LISTS'
// export const RECEIVE_TEMPLATE_LISTS = 'RECEIVE_TEMPLATE_LISTS'

// export function requestTemplateLists() {
//   return {
//     type: REQUEST_TEMPLATE_LISTS,
//     retrieving: true
//   }
// }

// export function receiveTemplateLists(lists) {
//   return {
//     type: RECEIVE_TEMPLATE_LISTS,
//     lists,
//     retrieving: false
//   }
// }

//async action for getting posts
export const fetchLists = () => dispatch => {
  dispatch({ type: TEMPLATE_LISTS_FETCH });

  let cookieStr = getCookieStr();
  if (cookieStr) {
    http_requests.Lists.getAllTemplateLists()
      .then(resp => {
        if (resp.type === 'error') {
          dispatch({
            type: TEMPLATE_LISTS_FETCH_ERR,
            message: resp.message
          })
        } else {
          dispatch({
            type: TEMPLATE_LISTS_FETCH_SUCCESS,
            message: resp.message,
            shoppingLists: resp.templateLists
          })
        }
      })
      .catch(err => dispatch({
        type: TEMPLATE_LISTS_FETCH_ERR,
        message: err.message
      }))
  } else {
    dispatch({
      type: TEMPLATE_LISTS_FETCH_ERR,
      message: 'User is not logged in.'
    })
  }
}

  // return fetch(API_GET_POSTS, INIT_GET_CATEGORIES)
  //   .then(response => response.json())
  //   // use json.posts to make the data more shallow
  //   .then(json => {
  //     dispatch(receivePosts(json))
  //     // need make multiple calls to get the comments list per postId
  //     let allIds = []
  //     json.forEach(post => {
  //       allIds.push(post.id)
  //     })
  //     allIds.forEach(postId => {
  //       dispatch(fetchComments(postId))
  //     }) 
  //   })
  //   .catch(function(err) {
  //     console.log('fetch err: ' + err.message)
  //   })

// export const REQUEST_ADD_TEMPLATE_LIST = 'REQUEST_ADD_TEMPLATE_LIST'
// export const RECEIVE_ADD_TEMPLATE_LIST = 'RECEIVE_ADD_TEMPLATE_LIST'

// export function requestTemplateListCreate() {
//   return {
//     type: REQUEST_ADD_TEMPLATE_LIST,
//     retrieving: true
//   }
// }

// export function receiveTemplateListCreate(listObj) {

//   let normListObj = {}
//   let listId = listObj.listId
//   normListObj[listId] = listObj

//   return {
//     type: RECEIVE_ADD_TEMPLATE_LIST,
//     normListObj,
//     retrieving: false
//   }
// }

// async action for getting posts
// export const fetchListCreate = (postData) => dispatch => {
//   dispatch(requestPostCreate())
//   let INIT_CREATE_POST = {method: 'POST',
//                           headers: {
//                             'Authorization': 'mAuth',
//                             "Content-Type": 'application/json'
//                           },
//                           body: JSON.stringify(postData)
//                         }

//   return fetch(API_GET_POSTS, INIT_CREATE_POST)
//     .then(response => response.json())
//     // use json.posts to make the data more shallow
//     .then(json => dispatch(receivePostCreate(json)))
//     .catch(function(err) {
//       console.log('fetch err: ' + err.message)
//     })
// }

/////

// section for edit Post action
// export const REQUEST_EDIT_TEMPLATE_LIST = 'REQUEST_EDIT_TEMPLATE_LIST'
// export const RECEIVE_EDIT_TEMPLATE_LIST = 'RECEIVE_EDIT_TEMPLATE_LIST'

// export function requestTemplateListEdit() {
//   return {
//     type: REQUEST_EDIT_TEMPLATE_LIST,
//     retrieving: true
//   }
// }

// export function receiveTemplateListEdit(listObj) {
//   let normListObj = {}
//   let listId = listObj.listId
//   normListObj[listId] = listObj

//   return {
//     type: RECEIVE_EDIT_TEMPLATE_LIST,
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
// export const REQUEST_DELETE_TEMPLATE_LIST = 'REQUEST_DELETE_TEMPLATE_LIST'
// export const RECEIVE_DELETE_TEMPLATE_LIST = 'RECEIVE_DELETE_TEMPLATE_LIST'

// export function requestTemplateListDelete() {
//   return {
//     type: REQUEST_DELETE_TEMPLATE_LIST,
//     retrievingDeletePost: true
//   }
// }

// export function receiveTemplateListDelete(listId) {
//   return {
//     type: RECEIVE_DELETE_TEMPLATE_LIST,
//     retrievingDeleteList: false,
//     deletedListId: listId
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