// src/Home.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuth } from '@okta/okta-react';
import { setAuthenticated, setNotAuthenticated, setToken } from './actions/authenticate';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    //this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

    //change this to calling an action
  async componentDidMount() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (this.props.auth && authenticated !== this.props.auth.isAuthenticated) {
      if (authenticated) {
        this.props.setAuthenticated();
        const token = this.props.auth.getAccessToken();
        this.props.setToken(token);
      } else {
        this.props.setNotAuthenticated();
      }
    }
  }

  async componentDidUpdate() {
    // const authenticated = await this.props.auth.isAuthenticated();
    // if (this.props.auth && authenticated !== this.props.auth.isAuthenticated) {
    //   if (authenticated) {
    //     this.props.setAuthenticated();
    //     const token = this.props.auth.getAccessToken();
    //     this.props.setToken(token);
    //   } else {
    //     this.props.setNotAuthenticated();
    //   }
    // }
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.setNotAuthenticated();
    this.props.auth.logout('/');
  }

  render() {
    if (this.props.auth) {
      console.log('authenticate', this.props.authenticate);
    }

    //change this to checking redux

    return (this.props.authenticate.isLoggedIn) ?
      <button onClick={this.logout}>Logout</button> :
      <button onClick={this.login}>Login</button>;
  }
}

const mapStateToProps = state => ({
  authenticate: state.authenticate,
})

const mapDispatchToProps = dispatch => ({
  setAuthenticated: () => dispatch(setAuthenticated()),
  setNotAuthenticated: () => dispatch(setNotAuthenticated()),
  setToken: (token) => dispatch(setToken(token))
})

// const enhance = compose(
//   // These are both single-argument HOCs
//   withAuth,
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(Home)
// )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Home));
