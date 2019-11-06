const API_ROOT = process.env.API_ROOT;
//URL MIDDLE
const API_LIST_MIDDLE = '/list';
//URL SUFFIXES
const CREATE_LIST_SUFFIX = '/add';
const GET_SHOPPING_LISTS_SUFFIX = '/shoppingLists';
const GET_TEMPLATE_LISTS_SUFFIX = '/templateLists';
const LIST_DETAIL_SUFFIX = '/listDetail';

const requests = {
  get: (url, token) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(resp => resolve(resp.json()))
        .catch(err => reject(err));
      //console.error('fetch error', err));
    });
  },
  post: (url, token, body) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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
  getAllShoppingLists: (token) => {
    return requests.get(`${API_ROOT}${API_LIST_MIDDLE}${GET_SHOPPING_LISTS_SUFFIX}`, token);
  },
  getAllTemplateLists: (token) => {
    return requests.get(`${API_ROOT}${API_LIST_MIDDLE}${GET_TEMPLATE_LISTS_SUFFIX}`, token);
  },
  postTemplateList: (token, list) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${CREATE_LIST_SUFFIX}`, token, list)
  }
};

export default {
  Lists,
};
