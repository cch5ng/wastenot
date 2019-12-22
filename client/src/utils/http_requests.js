import { getCookieStr } from './utils';

const API_ROOT = process.env.API_ROOT;
//URL MIDDLE
const API_LIST_MIDDLE = '/list';
const API_AUTH_MIDDLE = '/auth';
//URL SUFFIXES
const CREATE_LIST_SUFFIX = '/add';
const GET_SHOPPING_LISTS_SUFFIX = '/shoppingLists';
const GET_TEMPLATE_LISTS_SUFFIX = '/templateLists';
const LIST_DETAIL_SUFFIX = '/listDetail';
const AUTH_REGISTER_SUFFIX = '/register';
const AUTH_LOGIN_SUFFIX = '/login';
const AUTH_LOGOUT_SUFFIX = '/logout';
const AUTH_AUTHENTICATED_SUFFIX = '/authenticated';

//let cookieStr = getCookieStr();

const requests = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(resp => resolve(resp.json()))
        .catch(err => reject(err));
      //console.error('fetch error', err));
    });
  },
  post: (url, body) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
      })
        .then(resp => resolve(resp.json()))
        .catch(err => reject(err));
    });
  },
  put: (url, body) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
      })
        .then(resp => resolve(resp.json()))
        .catch(err => reject(err));
    });
  },
  delete: (url) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
        .then(resp => resolve(resp.json()))
        .catch(err => reject(err));
    });
  }
};

const Lists = {
  getAllShoppingLists: ({ cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${GET_SHOPPING_LISTS_SUFFIX}`, { cookieStr });
  },
  getAllTemplateLists: ({ cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${GET_TEMPLATE_LISTS_SUFFIX}`, { cookieStr });
  },
  getTemplateList: ({ guid, cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${guid}`, { cookieStr });
  },
  postTemplateList: ({ list, cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${CREATE_LIST_SUFFIX}`, { ...list, cookieStr });
  },
  putTemplateList: ({ list, cookieStr }) => {
    return requests.put(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${list.guid}`, { ...list, cookieStr });
  },
  deleteTemplateList: (guid) => {
    return requests.delete(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${guid}`);
  }
};

const Auth = {
  postRegister: (email, password) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_REGISTER_SUFFIX}`, {email, password});
  },
  postLogin: (email, password) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_LOGIN_SUFFIX}`, {email, password});
  },
  postLogout: (cookie) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_LOGOUT_SUFFIX}`, { cookie });
  }
  ,
  postAuthenticated: (cookie) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_AUTHENTICATED_SUFFIX}`, { cookie });
  }
}

export default {
  Lists,
  Auth,
};
