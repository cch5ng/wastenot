import { getCookieStr } from './utils';

const API_ROOT: string = process.env.API_ROOT;
//URL MIDDLE
const API_LIST_MIDDLE: string = '/list';
const API_AUTH_MIDDLE: string = '/auth';
const API_SETTING_MIDDLE: string = '/setting';
const API_LIST_ITEM_MAP_MIDDLE: string = '/listItemMap';
//URL SUFFIXES
const CREATE_TEMPLATE_LIST_SUFFIX: string = '/templateLists/add';
const CREATE_SHOPPING_LIST_SUFFIX: string = '/shoppingLists/add';
const GET_SHOPPING_LISTS_SUFFIX: string = '/shoppingLists';
const GET_TEMPLATE_LISTS_SUFFIX: string = '/templateLists';
const LIST_DETAIL_SUFFIX: string = '/listDetail';
const SHOPPING_LIST_DETAIL_SUFFIX: string = '/shoppingListDetail';
const AUTH_REGISTER_SUFFIX: string = '/register';
const AUTH_LOGIN_SUFFIX: string = '/login';
const AUTH_LOGOUT_SUFFIX: string = '/logout';
const AUTH_AUTHENTICATED_SUFFIX: string = '/authenticated';
const AUTH_PUSH_SUBSCRIPTION_SUFFIX: string = '/pushSubscription';
const AUTH_REMOVE_PUSH_SUBSCRIPTION_SUFFIX: string = '/removePushSubscription';
const AUTH_TEST_PUSH_SUBSCRIPTION_SUFFIX: string = '/testPush';
const SETTINGS_TIMEZONE_SUFFIX: string = '/settings/timezone';
const SETTING_LIST_ITEM_MAP_SUFFIX: string = '/listItemMapping';
const CREATE_SUFFIX: string = '/add';

const requests = {
  get: (url: string) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(resp => resolve(resp.json()))
        .catch(err => reject(err));
    });
  },
  post: (url: string, body) => {
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
  put: (url: string, body) => {
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
  delete: (url: string, body) => {
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

type AuthStringParams = { cookieStr: string };

type TemplateListGetParams = { guid: string; cookieStr: string };

type PostponeListItemNotificationPutParams = { list_item_guid: string; timestamp: string; cookieStr: string };

type PutCancelListItemNotification = { list_item_guid: string; cookieStr: string };

type ListItemNotificationSentPutParams = { list_item_id: string; email: string };

//type ShoppingListPostParams = { list: string; cookieStr: string };

// interface AuthStringObject {
//   cookieStr: string;
// }

// interface TemplateListGetParams {
//   guid: string;
//   cookieStr: string;
// }

// interface PostponeListItemNotificationPutParams {
//   list_item_guid: string;
//   timestamp: string;
//   cookieStr: string;
// }

// interface PutCancelListItemNotification {
//   list_item_guid: string;
//   cookieStr: string;
// }

// interface ListItemNotificationSentPutParams {
//   list_item_id: string;
//   email: string;
// }

// interface ShoppingListPostParams {
//   list: ;
//   cookieStr: string;
// }

const Lists = {
  getAllShoppingLists: ({cookieStr}: AuthStringParams) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${GET_SHOPPING_LISTS_SUFFIX}`, { cookieStr });
  },
  getTemplateList: ({guid, cookieStr}) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${guid}`, { cookieStr });
  },
  postShoppingList: ({ list, cookieStr }) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}${CREATE_SHOPPING_LIST_SUFFIX}`, { ...list, cookieStr });
  },
  putShoppingList: ({ list, cookieStr }) => {
    return requests.put(`${API_ROOT}${API_LIST_MIDDLE}${SHOPPING_LIST_DETAIL_SUFFIX}/${list.guid}`, { ...list, cookieStr });
  },
  //this DELETE is used for templates and shopping lists because done by id
  deleteTemplateList: ({guid, cookieStr}) => {
    return requests.delete(`${API_ROOT}${API_LIST_MIDDLE}${LIST_DETAIL_SUFFIX}/${guid}`, { cookieStr });
  },
  putListItemNotificationSent: ({list_item_id, email}) => {
    return requests.put(`${API_ROOT}${API_LIST_MIDDLE}/sentNotification/${list_item_id}`, { email });
  },
  getRecentListItemNotifications: ({cookieStr}) => {
    return requests.post(`${API_ROOT}${API_LIST_MIDDLE}/notifications`, {cookieStr});
  },
  putPostponeListItemNotification: ({list_item_guid, timestamp, cookieStr}) => {
    return requests.put(`${API_ROOT}${API_LIST_MIDDLE}/notifications/postpone/${list_item_guid}`, { timestamp, cookieStr });
  },
  putCancelListItemNotification: ({list_item_id, email}) => {
    return requests.put(`${API_ROOT}${API_LIST_MIDDLE}/notifications/cancel/${list_item_guid}`, { cookieStr });
  }
};

interface TimezoneParams {
  timezone: string;
  cookieStr: string;
}

interface PushSubscriptionPostParams {
  email: string;
  pushSubscription: string;
}

interface EmailParams {
  email: string;
}

const Auth = {
  postRegister: (email: string, password: string) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_REGISTER_SUFFIX}`, {email, password});
  },
  postLogin: (email: string, password: string) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_LOGIN_SUFFIX}`, {email, password});
  },
  postLogout: (cookie: string) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_LOGOUT_SUFFIX}`, { cookie });
  },
  postAuthenticated: (cookie: string) => {
    return requests.post(`${API_ROOT}${API_AUTH_MIDDLE}${AUTH_AUTHENTICATED_SUFFIX}`, { cookie });
  },
  putTimezone: ({timezone, cookieStr}) => {
    return requests.put(`${API_ROOT}${API_AUTH_MIDDLE}${SETTINGS_TIMEZONE_SUFFIX}`, { timezone, cookieStr });
  },
  getTimezone: ({cookieStr}) => {
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
  postListItemMapSetting: (cookie: string) => {
    return requests.post(`${API_ROOT}${API_SETTING_MIDDLE}${SETTING_LIST_ITEM_MAP_SUFFIX}`, { cookie });
  },
  putListItemMapSetting: (cookie: string) => {
    return requests.put(`${API_ROOT}${API_SETTING_MIDDLE}${SETTING_LIST_ITEM_MAP_SUFFIX}`, { cookie });
  }
}

const ListItemMap = {
  postListItemMaps: (cookie: string, listItemMaps) => {
    return requests.post(`${API_ROOT}${API_LIST_ITEM_MAP_MIDDLE}${CREATE_SUFFIX}`, { cookieStr: cookie, listItemMaps });
  },
  getListItemMaps: (cookie: string) => {
    return requests.post(`${API_ROOT}${API_LIST_ITEM_MAP_MIDDLE}/`, { cookieStr: cookie });
  }
}

export default {
  Lists,
  Auth,
  Setting,
  ListItemMap
};
