import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import AuthForm from './Auth/AuthForm';

class Root extends Component {

  render() {
    let isLoggedIn = this.props.authenticate.isLoggedIn;
    console.log('isLoggedIn', isLoggedIn)
    return (
      {isLoggedIn} === true ? <Home /> : <AuthForm />
    )
  }
}

const mapStateToProps = (state) => ({ authenticate: state.authenticate });

export default connect(
  mapStateToProps,
  null)(Root);
