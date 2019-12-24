import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register, logout, login, isAuthenticated } from '../actions/authenticate';
import { getCookieStr } from '../utils/utils';
import Button from '../App/Shared/Button/Button';
import InputText from '../App/Shared/InputText/InputText';

class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
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
        <h1>{this.props.title}</h1>
        <form>
          {this.Error}

          <InputText
            name="email" id="email"
            value={this.state.email}
            placeholder="email"
            onChangeHandler={this.updateInput} />
          <div />
          <input type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.updateInput} />
          <div />

          {this.props.title === 'Login' && (
            <Button label="Log In" onClickHandler={this.logInBtnClick} />
          )}
          {this.props.title === 'Sign Up' && (
            <Button label="Sign Up" onClickHandler={this.signInBtnClick} />
          )}
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
