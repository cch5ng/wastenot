import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import AuthForm from './Auth/AuthForm';

class Root extends Component {

  render() {
    return this.props.authenticate.isLoggedIn ? <Home /> : <AuthForm />
  }
}

const mapStateToProps = (state) => ({ authenticate: state.authenticate });

export default connect(
  mapStateToProps,
  null)(Root);
