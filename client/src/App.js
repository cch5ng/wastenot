import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import ListTemplates from './ListTemplates/ListTemplates';
import ListTemplateDetailForm from './ListTemplates/ListTemplateDetailForm';
import Header from './App/Header/Header';
//import Footer from './App/Footer/Footer'
import useListTemplates from './utils/hooks/useListTemplates';

function App() {
  //global state
  const {listTemplates, updateListTemplates, removeListTemplates} = useListTemplates();

  return (
    <Router>
      <div className="App">
        <Header />    
        <Route exact path="/" component={Home} />
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
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;
