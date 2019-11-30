import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom';
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

function App() {

  const {listTemplates, updateListTemplates, removeListTemplates} = useListTemplates();

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
              listTemplates={listTemplates}
            />
          )} />
          <Route exact path="/settings/listTemplatesEdit/:templateListId"
            render={({match}) => (<ListTemplateDetailForm mode="edit" updateListTemplates={updateListTemplates}
              templateListId={match.params.templateListId} listTemplates={listTemplates}
            />
          )} />
      </div>
    </Router>
  )
}

export default App;
