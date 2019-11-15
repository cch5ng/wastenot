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
        body: JSON.stringify(body),
      })
        .then(resp => resolve(resp.json()))
        .catch(err => reject(err));
    });
  },
};

const Lists = {
  getAllShoppingLists: () => {
    return requests.get(`${API_ROOT}${API_LIST_MIDDLE}${GET_SHOPPING_LISTS_SUFFIX}`, token);
  },
  getAllTemplateLists: () => {
    return requests.get(`${API_ROOT}${API_LIST_MIDDLE}${GET_TEMPLATE_LISTS_SUFFIX}`, token);
  },
  postTemplateList: (list) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${CREATE_LIST_SUFFIX}`, token, list)
  }
};

const Auth = {
  postRegister: (email, password) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_REGISTER_SUFFIX}`, {email, password});
  },
  postLogin: (email, password) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_LOGIN_SUFFIX}`, {email, password});
  },
  getLogout: () => {
    return requests.get(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_LOGOUT_SUFFIX}`);
  }
}

export default {
  Lists,
  Auth,
};
