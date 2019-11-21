import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, logout, login } from '../actions/authenticate';

class AuthForm extends Component {

  state = {
    email: '',
    password: ''
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
    if (this.props.authenticate.status === 'error') {
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
    login: ({ email, password }) => dispatch(login({ email, password }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AuthForm);
