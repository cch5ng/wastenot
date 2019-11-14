import React, { Component } from 'react';

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
    ev.preventDefault();
    console.log('state', this.state)
  }

  signInBtnClick = (ev) => {
    ev.preventDefault();
    console.log('state', this.state)
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

export default AuthForm;