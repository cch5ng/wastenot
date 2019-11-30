// src/Home.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout } from './actions/authenticate';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

    //change this to calling an action
  // async componentDidMount() {
  // }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.logout();
  }

  render() {
    return (this.props.authenticate.isLoggedIn) ?
      <button onClick={this.logout}>Logout</button> :
      <button onClick={this.login}>Login</button>;
  }
}

const mapStateToProps = state => ({
  authenticate: state.authenticate,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
