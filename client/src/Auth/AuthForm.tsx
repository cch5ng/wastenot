import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; //connect, 
import { Redirect } from 'react-router-dom';
import { getCookieStr } from '../utils/utils';
import Button from '../App/Shared/Button/Button';
import InputText from '../App/Shared/InputText/InputText';
import { register, logout, login, isAuthenticated } from './authSlice';
import type { RootState } from '../App/store';

//import { register, logout, login, isAuthenticated } from '../actions/authenticate';

// type MyProps = {
//   login: any,
//   logout: any,
//   title: string,
//   authenticate: {
//     isLoggedIn: boolean,
//     hasButtonClicked: boolean,
//     status: string,
//     message: string,
//     authStr: string,
//   },
//   register: any,
//   isAuthenticated: any,
// };

type MyState = {
  email: string,
  password: string,
  passwordConfirm: string,
  inputValidationErrors: string[]
};

//class AuthForm extends React.Component { //<MyProps, MyState>
  // constructor(props) { //: MyProps
  //   super(props);
  //   this.state = {
  //     email: '',
  //     password: '',
  //     passwordConfirm: '',
  //     inputValidationErrors: []
  //   }
  // }

const AuthForm = ({title}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [inputValidationErrors, setInputValidationErrors] = useState([]);

  const dispatch = useDispatch();
  const {status, hasButtonClicked, message} = useSelector((state: RootState) => state.auth)

  const updateInput = (event: React.FormEvent<HTMLInputElement>): void => {
    let target = event.target as HTMLInputElement;
    const {name, value}  = target;

    switch(name) {
      case 'email':
        setEmail(value);
        return;
      case 'password':
        setPassword(value);
        return;
      case 'passwordConfirm':
        setPasswordConfirm(value);
        return;
      default:
        return;
    }
    //this.setState({[name]: value})
  };

  const logInBtnClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {    
    event.preventDefault();
    //const { email, password } = this.state;
    const emailErrors = ['Email is required.', 'Email must be valid. Please check spelling and try again.'];
    setInputValidationErrors([]);
    //this.setState({inputValidationErrors: []}); //clear old errors
    if (!isEmailValid()) {
      setInputValidationErrors(emailErrors);
      //this.setState({inputValidationErrors: emailErrors});
      return;
    }
    dispatch(login({email, password}));
    //this.props.login({ email, password });  
  };

  const logOutBtnClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {  
    event.preventDefault();
    dispatch(logout);
    //this.props.logout();
  };

  const signInBtnClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {  
    event.preventDefault();
    //const { email, password, passwordConfirm } = this.state;
    const emailErrors = ['Email is required.', 'Email must be valid. Please check spelling and try again.'];
    const passwordErrors = ['Password and confirmation password values are required.', 
      'Password and confirmation password must be at least 8 characters long, contain one lower-case letter, contain one upper-case letter, contain one number, and container one special character (!, @, #, $, %, ^, &, *, or -).',
      'Password and confirmation password values must match.']

    setInputValidationErrors([]);
    //this.setState({inputValidationErrors: []}); //clear old errors
    if (!isEmailValid() && !isPasswordValid()) {
      let combinedErrors = emailErrors.concat(passwordErrors);
      setInputValidationErrors(combinedErrors);
      //this.setState({inputValidationErrors: combinedErrors});
      return;
    } else if (!isEmailValid()) {
      setInputValidationErrors(emailErrors);
      //this.setState({inputValidationErrors: emailErrors});
      return;
    } else if (!isPasswordValid()) {
      setInputValidationErrors(passwordErrors);
      //this.setState({inputValidationErrors: passwordErrors});
      return;
    }
    dispatch(register({email, password}));
    //this.props.register({ email, password });
  };

  const isEmailValid = (): boolean => {    
    //const {email} = this.state;
    if (!email.length) {
      return false;
    }
    const regex = /^(?=.*?[A-Za-z])(?=.*?[@])(?=.*?[\.]).{6,}$/gm
    return doesStrMatchPattern(email, regex);
  };

  const isPasswordValid = (): boolean => {    
    //const {password, passwordConfirm} = this.state;
    if (!password.length || !passwordConfirm.length) {
      return false;
    }
    if (password !== passwordConfirm) {
      return false;
    }
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm
    if (!doesStrMatchPattern(password, regex) || !doesStrMatchPattern(passwordConfirm, regex)) {
      return false;
    }
    return true;
  };

  const doesStrMatchPattern = (
    str: string,
    pattern: any
  ): boolean => {  
    let matcher = str.match(pattern);
    if (matcher && matcher.length && matcher[0] === str) {
      return true;
    }
    return false;
  };

  //this.props.authenticate.status
  //this.props.authenticate.hasButtonClicked
  //this.props.authenticate.message
  return (
    <div className="main">
      <form className="authFormContainer">
        <h1>{title}</h1>

        {status === 'error' && hasButtonClicked === true && (
          <div>
            <p>{message}</p>
          </div>
        )}
        {inputValidationErrors.length > 0 && (
          <ul className="listErrorMessages">
            {inputValidationErrors.map(err => {
              return (<li>{err}</li>)
            })}
          </ul>
        )}

        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <InputText
            name="email" id="email"
            value={email}
            type="text"
            placeholder="email"
            onChangeHandler={updateInput}
            inputClassName=''
            readOnly={false} />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <InputText type="password"
          name="password"
          id="password"
          value={password}
          placeholder="password"
          onChangeHandler={updateInput}
          inputClassName=''
          readOnly={false}/>
        </div>
        {title === 'Sign Up' && (
          <div  className="formGroup">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <InputText type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="confirm password"
              onChangeHandler={updateInput}
              inputClassName=''
              readOnly={false} />
          </div>
        )}
        {title === 'Login' && (
          <Button label="Log In" onClickHandler={logInBtnClick} 
            classVal='' idVal='' size={null} type={null} noMargin={false}/>
        )}
        {title === 'Sign Up' && (
          <Button label="Sign Up" onClickHandler={signInBtnClick}
            classVal='' idVal='' size={null} type={null} noMargin={false}/>
        )}
      </form>
    </div>
  )
  
}

// const mapStateToProps = state => ({ authenticate: state.authenticate });

// const mapDispatchToProps = dispatch => {
//   return {
//     register: ({ email, password }) => dispatch(register({ email, password })),
//     logout: () => dispatch(logout()),
//     login: ({ email, password }) => dispatch(login({ email, password })),
//     isAuthenticated: () => dispatch(isAuthenticated())
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps)(AuthForm);

export default AuthForm;