import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import ListTemplates from './ListTemplates/ListTemplates';
import ListTemplateDetailForm from './ListTemplates/ListTemplateDetailForm';
import Header from './App/Header/Header';
//import Footer from './App/Footer/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />    
        <Route exact path="/" component={Home} />
        <Route exact path="/settings/listTemplates" render={() => (
          <ListTemplates />
        )} />

        <Route exact path="/settings/listTemplatesNew" render={() => (
          <ListTemplateDetailForm mode="add" />
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
