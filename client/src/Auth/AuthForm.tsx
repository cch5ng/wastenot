import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register, logout, login, isAuthenticated } from '../actions/authenticate';
import { getCookieStr } from '../utils/utils';
import Button from '../App/Shared/Button/Button';
import InputText from '../App/Shared/InputText/InputText';

type MyProps = {
  login: any,
  logout: any,
  title: string,
  authenticate: {
    isLoggedIn: boolean,
    hasButtonClicked: boolean,
    status: string,
    message: string,
    authStr: string,
  },
  register: any,
  isAuthenticated: any,
};
type MyState = {
  email: string,
  password: string,
  passwordConfirm: string,
  inputValidationErrors: string[]
};

class AuthForm extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      inputValidationErrors: []
    }
  }

  updateInput = (event: React.FormEvent<HTMLInputElement>): void => {
    let target = event.target as HTMLInputElement;
    const {name, value}  = target;
    this.setState({[name]: value})
  };

  logInBtnClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {    
    event.preventDefault();
    const { email, password } = this.state;
    const emailErrors = ['Email is required.', 'Email must be valid. Please check spelling and try again.'];
    this.setState({inputValidationErrors: []}); //clear old errors
    if (!this.isEmailValid()) {
      this.setState({inputValidationErrors: emailErrors});
      return;
    }
    this.props.login({ email, password });  
  };

  logOutBtnClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {  
    event.preventDefault();
    this.props.logout();
  };

  signInBtnClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {  
    event.preventDefault();
    const { email, password, passwordConfirm } = this.state;
    const emailErrors = ['Email is required.', 'Email must be valid. Please check spelling and try again.'];
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
  };

  isEmailValid = (): boolean => {    
    const {email} = this.state;
    if (!email.length) {
      return false;
    }
    const regex = /^(?=.*?[A-Za-z])(?=.*?[@])(?=.*?[\.]).{6,}$/gm
    return this.doesStrMatchPattern(email, regex);
  };

  isPasswordValid = (): boolean => {    
    const {password, passwordConfirm} = this.state;
    if (!password.length || !passwordConfirm.length) {
      return false;
    }
    if (password !== passwordConfirm) {
      return false;
    }
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm
    if (!this.doesStrMatchPattern(password, regex) || !this.doesStrMatchPattern(passwordConfirm, regex)) {
      return false;
    }
    return true;
  };

  doesStrMatchPattern = (
    str: string,
    pattern: any
  ): boolean => {  
    let matcher = str.match(pattern);
    if (matcher && matcher.length && matcher[0] === str) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div className="main">
        <h1>{this.props.title}</h1>
        <form>
          {this.props.authenticate.status === 'error' && this.props.authenticate.hasButtonClicked === true && (
            <div>
              <p>{this.props.authenticate.message}</p>
            </div>
          )}
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
            onChangeHandler={this.updateInput}
            inputClassName=''
            readOnly={false} />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <InputText type="password"
            name="password"
            id="password"
            value={this.state.password}
            placeholder="password"
            onChangeHandler={this.updateInput}
            inputClassName=''
            readOnly={false}/>
          </div>
          {this.props.title === 'Sign Up' && (
            <div  className="formGroup">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <InputText type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                placeholder="confirm password"
                onChangeHandler={this.updateInput}
                inputClassName=''
                readOnly={false} />
            </div>
          )}
          {this.props.title === 'Login' && (
            <Button label="Log In" onClickHandler={this.logInBtnClick} 
              classVal='' idVal='' size={null} type={null} noMargin={false}/>
          )}
          {this.props.title === 'Sign Up' && (
            <Button label="Sign Up" onClickHandler={this.signInBtnClick}
              classVal='' idVal='' size={null} type={null} noMargin={false}/>
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
