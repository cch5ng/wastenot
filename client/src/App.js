import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
//import Header from './App/Header/Header'
//import Footer from './App/Footer/Footer'

function App() {
  return (
       <Router>
         <Route exact path="/" component={Home} />
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

//         <Header />
