import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import './App.css';
import Header from './App/Header/Header';
import AuthHeader from './App/Header/AuthHeader';
import ShoppingListDetailForm from './ShoppingLists/ShoppingListDetailForm';
import ShoppingLists from './ShoppingLists/ShoppingLists';
import config from './config';
import AuthForm from './Auth/AuthForm';
import Settings from './Auth/Settings';
import ExpirationMapTest from './Settings/ExpirationMapTest';
import Alerts from './Alerts/Alerts';

function App(props) {

  let isLoggedIn = false;
  if (props.authenticate && props.authenticate.isLoggedIn) {
    isLoggedIn = true;
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <div className="App">
          <AuthHeader />
          <Route path='/' exact 
            render={(props) => (<AuthForm {...props} title="Login" />
            )} />
          <Route path='/signup' exact 
            render={(props) => (<AuthForm {...props} title="Sign Up" />
            )} />
        </div>
      </Router>
    )
  }

  if (isLoggedIn) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path='/' exact component={ShoppingLists}/>
          <Route exact path='/shoppingLists' component={ShoppingLists} />
          <Route exact path='/shoppingLists/new'
            render={(props) => (<ShoppingListDetailForm {...props} mode="add" />
            )}
          />
          <Route exact path='/shoppingLists/:listGuid/edit'
            render={({match}) => (<ShoppingListDetailForm mode="edit" listGuid={match.params.listGuid} />
            )}
          />
          <Route exact path="/settings/expirationMapTest" 
            component={ExpirationMapTest}
          />
          <Route exact path="/settings"
            render={(props) => (<Settings {...props}/>
          )} />
          <Route exact path="/alerts"
            render={(props) => (<Alerts {...props}/>
          )} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  authenticate: state.authenticate
})

export default connect(mapStateToProps, null)(App);