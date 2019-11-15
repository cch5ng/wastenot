import React, { Component } from 'react';
import { fetchAuthRegister, fetchAuthLogin } from '../actions/authenticate';

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
    this.props.fetchAuthLogin(email, password);
    //console.log('state', this.state)
  }

  signInBtnClick = (ev) => {
    const { email, password } = this.state;
    ev.preventDefault();
    this.props.fetchAuthRegister(email, password);
    //console.log('state', this.state)
  }

  render() {
    return (
      <div>
        <h1>AuthForm</h1>
        <form>
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
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthRegister: (email, password) => {
      dispatch(fetchAuthRegister(email, password)
    },
    fetchAuthLogin: (email, password) => {
      dispatch(fetchAuthLogin(email, password)
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AuthForm);


//export default AuthForm;