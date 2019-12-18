import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Root from './Root';
import './App.css';
import Header from './App/Header/Header';
//import Footer from './App/Footer/Footer'
import ListTemplates from './ListTemplates/ListTemplates';
import ListTemplateDetailForm from './ListTemplates/ListTemplateDetailForm';
//import ListTemplateDetail from './ListTemplates/ListTemplateDetail';
import useListTemplates from './utils/hooks/useListTemplates';
import config from './config';

function App(props) {

  const {listTemplates, updateListTemplates, removeListTemplates} = useListTemplates();
  if (props.authenticate && props.authenticate.isLoggedIn) {
   console.log('isLoggedIn')
  }

  return (
    <Router>
      <div className="App">
        <Header />
          <Route path='/' exact component={Root}/>
          <Route exact path="/settings/listTemplates" 
            render={(props) => (<ListTemplates {...props} updateListTemplates={updateListTemplates}
              removeListTemplates={removeListTemplates} listTemplates={listTemplates}
            />
          )} />
          <Route exact path="/settings/listTemplatesNew"
            render={(props) => (<ListTemplateDetailForm {...props} mode="add" updateListTemplates={updateListTemplates}
            />
          )} />
          <Route exact path="/settings/listTemplatesEdit/:listTemplateGuid"
            render={({match}) => (<ListTemplateDetailForm mode="edit" updateListTemplates={updateListTemplates}
              listTemplateGuid={match.params.listTemplateGuid}
            />
          )} />
      </div>
    </Router>
  )
}


const mapStateToProps = state => ({
  authenticate: state.authenticate
})

export default connect(mapStateToProps, null)(App);
