import http_requests from '../utils/http_requests';

export const LISTS_FETCH = 'LISTS_FETCH';
export const LISTS_ERR = 'LISTS_ERR';
export const LISTS_SUCCESS = 'LISTS_SUCCESS';

// export const REQUEST_LISTS = 'REQUEST_LISTS'
// export const RECEIVE_LISTS = 'RECEIVE_LISTS'

export function requestLists() {
  return {
    type: REQUEST_LISTS,
    retrieving: true
  }
}

export function receiveLists(lists) {
  return {
    type: RECEIVE_LISTS,
    lists,
    retrieving: false
  }
}

// async action for getting posts
// export const fetchLists = () => dispatch => {
//   dispatch(requestPosts())
//   return fetch(API_GET_POSTS, INIT_GET_CATEGORIES)
//     .then(response => response.json())
//     // use json.posts to make the data more shallow
//     .then(json => {
//       dispatch(receivePosts(json))
//       // need make multiple calls to get the comments list per postId
//       let allIds = []
//       json.forEach(post => {
//         allIds.push(post.id)
//       })
//       allIds.forEach(postId => {
//         dispatch(fetchComments(postId))
//       }) 
//     })
//     .catch(function(err) {
//       console.log('fetch err: ' + err.message)
//     })
// }

export const REQUEST_ADD_LIST = 'REQUEST_ADD_LIST'
export const RECEIVE_ADD_LIST = 'RECEIVE_ADD_LIST'

export function requestListCreate() {
  return {
    type: REQUEST_ADD_LIST,
    retrieving: true
  }
}

export function receiveListCreate(listObj) {

  let normListObj = {};
  let listId = listObj.listId;
  normListObj[listId] = listObj;

  return {
    type: RECEIVE_ADD_LIST,
    normListObj,
    retrieving: false
  }
}

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
export const REQUEST_EDIT_LIST = 'REQUEST_EDIT_LIST'
export const RECEIVE_EDIT_LIST = 'RECEIVE_EDIT_LIST'

export function requestListEdit() {
  return {
    type: REQUEST_EDIT_LIST,
    retrieving: true
  }
}

export function receiveListEdit(listObj) {
  let normListObj = {}
  let listId = listObj.listId
  normListObj[listId] = listObj

  return {
    type: RECEIVE_EDIT_LIST,
    normListObj,
    retrieving: false
  }
}

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
export const REQUEST_DELETE_LIST = 'REQUEST_DELETE_LIST'
export const RECEIVE_DELETE_LIST = 'RECEIVE_DELETE_LIST'

export function requestListDelete() {
  return {
    type: REQUEST_DELETE_LIST,
    retrievingDeletePost: true
  }
}

export function receiveListDelete(listId) {
  return {
    type: RECEIVE_DELETE_LIST,
    retrievingDeleteList: false,
    listId
  }
}

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