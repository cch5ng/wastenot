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
      password: '',
      passwordConfirm: '',
      inputValidationErrors: [],
    }
  }

  updateInput = ev => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({[name]: value})
  }

  logInBtnClick = (ev) => {
    ev.preventDefault();
    const { email, password } = this.state;
    this.validateEmail();
    this.props.login({ email, password });
  }

  logOutBtnClick = (ev) => {
    ev.preventDefault();
    this.props.logout();
  }

  signInBtnClick = (ev) => {
    ev.preventDefault();
    const { email, password, passwordConfirm } = this.state;
    //email errors
    const emailErrors = ['Email is required.', 'Email must be valid. Please check spelling and try again.'];
    //password errors
    const passwordErrors = ['Password and confirmation password values are required.', 
      'Password and confirmation password must be at least 8 characters long, contain one lower-case letter, contain one upper-case letter, contain one number, and container one special character (!, @, #, $, %, ^, &, *, or -).',
      'Password and confirmation password values must match.']
    this.setState({inputValidationErrors: []}); //clear old errors
    if (!this.isEmailValid() && !this.isPasswordValid()) {
      let combinedErrors = emailErrors.concat(passwordErrors);
      this.setState({inputValidationErrors: combinedErrors});
      return;
    } else if (!this.isEmailValid()) {
      this.setState({inputValidationErrors: emailErrors});
      return;
    } else if (!this.isPasswordValid()) {
      this.setState({inputValidationErrors: passwordErrors});
      return;
    }
    this.props.register({ email, password });
  }

  isEmailValid = () => {
    const {email} = this.state;
    //valid email is not empty
    if (!email.length) {
      return false;
    }
    //validate email valid
    const regex = /^(?=.*?[A-Za-z])(?=.*?[@])(?=.*?[\.]).{6,}$/gm
    return this.doesStrMatchPattern(email, regex);
  }

  isPasswordValid = () => {
    const {password, passwordConfirm} = this.state;
    //validate password is not empty
    if (!password.length || !passwordConfirm.length) {
      return false;
    }
    //validate password and passwordConfirm match
    if (password !== passwordConfirm) {
      return false;
    }

    //validate password and passwordConfirm valid
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm
    if (!this.doesStrMatchPattern(password, regex) || !this.doesStrMatchPattern(passwordConfirm, regex)) {
      return false;
    }
    return true;
  }

  doesStrMatchPattern(str, pattern) {
    let matcher = str.match(pattern);
    if (matcher && matcher.length && matcher[0] === str) {
      return true;
    }
    return false;
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
      <div className="main">
        <h1>{this.props.title}</h1>
        <form>
          {this.Error}

          {this.state.inputValidationErrors.length > 0 && (
            <ul>
              {this.state.inputValidationErrors.map(err => {
                return (<li>{err}</li>)
              })}
            </ul>
          )}

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <InputText
            name="email" id="email"
            value={this.state.email}
            type="text"
            placeholder="email"
            onChangeHandler={this.updateInput} />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <InputText type="password"
            name="password"
            id="password"
            value={this.state.password}
            placeholder="password"
            onChangeHandler={this.updateInput} />
          </div>
          {this.props.title === 'Sign Up' && (
            <div  className="formGroup">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <InputText type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                placeholder="confirm password"
                onChangeHandler={this.updateInput} />
            </div>
          )}
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
