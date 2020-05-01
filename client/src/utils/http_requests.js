import { getCookieStr } from './utils';

const API_ROOT = process.env.API_ROOT;
//URL MIDDLE
const API_LIST_MIDDLE = '/list';
const API_AUTH_MIDDLE = '/auth';
const API_SETTING_MIDDLE = '/setting';
const API_LIST_ITEM_MAP_MIDDLE = '/listItemMap';
//URL SUFFIXES
const CREATE_TEMPLATE_LIST_SUFFIX = '/templateLists/add';
const CREATE_SHOPPING_LIST_SUFFIX = '/shoppingLists/add';
const GET_SHOPPING_LISTS_SUFFIX = '/shoppingLists';
const GET_TEMPLATE_LISTS_SUFFIX = '/templateLists';
const LIST_DETAIL_SUFFIX = '/listDetail';
const SHOPPING_LIST_DETAIL_SUFFIX = '/shoppingListDetail';
const AUTH_REGISTER_SUFFIX = '/register';
const AUTH_LOGIN_SUFFIX = '/login';
const AUTH_LOGOUT_SUFFIX = '/logout';
const AUTH_AUTHENTICATED_SUFFIX = '/authenticated';
const AUTH_PUSH_SUBSCRIPTION_SUFFIX = '/pushSubscription';
const AUTH_REMOVE_PUSH_SUBSCRIPTION_SUFFIX = '/removePushSubscription';
const AUTH_TEST_PUSH_SUBSCRIPTION_SUFFIX = '/testPush';
const SETTINGS_TIMEZONE_SUFFIX = '/settings/timezone';
const SETTING_LIST_ITEM_MAP_SUFFIX = '/listItemMapping';
const CREATE_SUFFIX = '/add';

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
  delete: (url, body) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
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
  //this GET is used for templates and shopping lists because retrieval by id
  getTemplateList: ({ guid, cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${guid}`, { cookieStr });
  },
  postTemplateList: ({ list, cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${CREATE_TEMPLATE_LIST_SUFFIX}`, { ...list, cookieStr });
  },
  postShoppingList: ({ list, cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${CREATE_SHOPPING_LIST_SUFFIX}`, { ...list, cookieStr });
  },
  putTemplateList: ({ list, cookieStr }) => {
    return requests.put(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${list.guid}`, { ...list, cookieStr });
  },
  putShoppingList: ({ list, cookieStr }) => {
    return requests.put(`${API_ROOT}${API_LIST_MIDDLE}${SHOPPING_LIST_DETAIL_SUFFIX}/${list.guid}`, { ...list, cookieStr });
  },
  //this DELETE is used for templates and shopping lists because done by id
  deleteTemplateList: ({ guid, cookieStr }) => {
    return requests.delete(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${guid}`, { cookieStr });
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
  },
  putTimezone: ({ timezone, cookieStr }) => {
    return requests.put(`${API_ROOT}${API_AUTH_MIDDLE}${SETTINGS_TIMEZONE_SUFFIX}`, { timezone, cookieStr });
  },
  getTimezone: ({ cookieStr }) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${SETTINGS_TIMEZONE_SUFFIX}`, { cookieStr });
  },
  postPushSubscription: ({email, pushSubscription}) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_PUSH_SUBSCRIPTION_SUFFIX}`, {email, pushSubscription})
  },
  putPushSubscription: ({email}) => {
    return requests.put(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_REMOVE_PUSH_SUBSCRIPTION_SUFFIX}`, {email})
  }
}

const Setting = {
  postListItemMapSetting: (cookie) => {
    return requests.post(`${API_ROOT}${API_SETTING_MIDDLE}${SETTING_LIST_ITEM_MAP_SUFFIX}`, { cookie });
  },
  putListItemMapSetting: (cookie) => {
    return requests.put(`${API_ROOT}${API_SETTING_MIDDLE}${SETTING_LIST_ITEM_MAP_SUFFIX}`, { cookie });
  }
}

const ListItemMap = {
  postListItemMaps: (cookie, listItemMaps) => {
    return requests.post(`${API_ROOT}${API_LIST_ITEM_MAP_MIDDLE}${CREATE_SUFFIX}`, { cookieStr: cookie, listItemMaps });
  },
  getListItemMaps: (cookie) => {
    return requests.post(`${API_ROOT}${API_LIST_ITEM_MAP_MIDDLE}/`, { cookieStr: cookie });
  }
}

export default {
  Lists,
  Auth,
  Setting,
  ListItemMap,
};
