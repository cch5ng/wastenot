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
