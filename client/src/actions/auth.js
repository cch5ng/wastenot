// action types
export const SET_AUTH = 'SET_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';

export function setAuthenticated() {
  return {
    type: SET_AUTH,
    retrieving: false,
  };
}

export function setNotAuthenticated() {
  return {
    type: REMOVE_AUTH,
    retrieving: false,
  };
}

export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
    retrieving: false,
  };
}

export function removeToken() {
  return {
    type: REMOVE_TOKEN,
    retrieving: false,
  };
}



  //move to action
// export const checkAuthentication = (fn) => (dispatch, fn) => {
//   dispatch(requestAuthentication());
//   //const authenticated = await fn(); //this.props.auth.isAuthenticated();
//   fn()
//     .then(authenticated => {
//       console.log('authenticated', authenticated);
//       dispatch(receiveAuthentication(authenticated));
//     })
//     .catch(err => console.error('err', err))

//   //if (authenticated !== this.state.authenticated) {
//     //this.setState({ authenticated });
//   //}
// }

// export const fetchQuestions = () => dispatch => {
//   dispatch(requestAllQuestions());
//   return http_requests.Questions.getAll()
//     .then(json => dispatch(receiveAllQuestions(json)))
//     .catch(err => console.error('fetch error', err));
// };