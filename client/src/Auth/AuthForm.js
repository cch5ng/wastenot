import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register, logout, login, isAuthenticated } from '../actions/authenticate';
import { getCookieStr } from '../utils/utils';

class AuthForm extends Component {

  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
  }

  updateInput = ev => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({[name]: value})
  }

  logInBtnClick = (ev) => {
    const { email, password } = this.state;
    ev.preventDefault();
    this.props.login({ email, password });
  }

  logOutBtnClick = (ev) => {
    ev.preventDefault();
    this.props.logout();
  }

  signInBtnClick = (ev) => {
    const { email, password } = this.state;
    ev.preventDefault();
    this.props.register({ email, password });
  }

  get Error() {
    if (this.props.authenticate.status === 'error' && this.props.authenticate.hasButtonClicked === true) {
      return (
        <div>
          <p>{this.props.authenticate.message}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>AuthForm</h1>
        <form>
          {this.Error}

          <input type="text"
            name="email"
            value={this.state.email}
            placeholder="email"
            onChange={this.updateInput}
          />
          <div />
          <input type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.updateInput}
          />
          <div />
          <button onClick={this.logInBtnClick}>Log In</button>
          <span> or </span>
          <button onClick={this.signInBtnClick}>Sign Up</button>
          <span> or </span>
          <button onClick={this.logOutBtnClick}>Log Out</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({ authenticate: state.authenticate });

const mapDispatchToProps = dispatch => {
  return {
    register: ({ email, password }) => dispatch(register({ email, password })),
    logout: () => dispatch(logout()),
    login: ({ email, password }) => dispatch(login({ email, password })),
    isAuthenticated: () => dispatch(isAuthenticated())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AuthForm);
