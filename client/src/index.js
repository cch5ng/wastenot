import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Provider, useDispatch } from 'react-redux';

import {isAuthenticated} from './Auth/authSlice';
import store from './App/store'
import './index.css';
import App from './App';
import * as serviceWorker from './sw';

store.dispatch(isAuthenticated());

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>, document.getElementById('root'));

if (!('serviceWorker' in navigator)) {
//   // Service Worker isn't supported on this browser, disable or hide UI.
//   //return;
  alert("This browser does not support service workers");
} else if (!('PushManager' in window)) {
//   // Push isn't supported on this browser, disable or hide UI.
//   //return;
  alert("This browser does not support the push api");
} else if (!('Notification' in window)) {
  alert("This browser does not support desktop notification");
} else {
  serviceWorker.registerServiceWorker();
}
