import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import './App.css';
import Header from './App/Header/Header';
import AuthHeader from './App/Header/AuthHeader';
//import Footer from './App/Footer/Footer'
import ListTemplates from './ListTemplates/ListTemplates';
import ListTemplateDetailForm from './ListTemplates/ListTemplateDetailForm';
import ShoppingListDetailForm from './ShoppingLists/ShoppingListDetailForm';
import useListTemplates from './utils/hooks/useListTemplates';
import ShoppingLists from './ShoppingLists/ShoppingLists';
import config from './config';
import AuthForm from './Auth/AuthForm';
import Settings from './Auth/Settings';
import ExpirationMapTest from './Settings/ExpirationMapTest';

function App(props) {

  //TODO test, think these hooks are not being used currently
  const {listTemplates, updateListTemplates, removeListTemplates} = useListTemplates();

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

          <Route exact path="/settings/listTemplates" 
            render={(props) => (<ListTemplates {...props} updateListTemplates={updateListTemplates}
              removeListTemplates={removeListTemplates} listTemplates={listTemplates}
            />
          )} />
          <Route exact path="/settings/listTemplatesNew"
            render={(props) => (<ListTemplateDetailForm {...props} mode="add" 
              updateListTemplates={updateListTemplates}
            />
          )} />
          <Route exact path="/settings/listTemplatesEdit/:listTemplateGuid"
            render={({match}) => (<ListTemplateDetailForm mode="edit" 
              updateListTemplates={updateListTemplates}
              listTemplateGuid={match.params.listTemplateGuid}
            />
          )} />
          <Route exact path="/settings/expirationMapTest" 
            component={ExpirationMapTest}
          />
          <Route exact path="/settings"
            render={(props) => (<Settings {...props}
            />
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

/*
          <Route exact path='/shoppingLists/new' 
            render={(props) => (<ShoppingListDetailForm {...props} mode="add" 
              updateShoppingLists={updateShoppingLists}
            />
          )} />

          <Route exact path="/shoppingLists/edit/:listGuid"
            render={({match}) => (<ShoppingListDetailForm mode="edit" 
              updateShoppingLists={updateShoppingLists}
              listGuid={match.params.listGuid}
            />
          )} />
*/
