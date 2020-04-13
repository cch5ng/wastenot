import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { isAuthenticated } from './actions/authenticate';
import './index.css';
import App from './App';
import * as serviceWorker from './sw';
//import {registerServiceWorker} from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
  composeEnhancers(
    applyMiddleware(thunk)
));

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

