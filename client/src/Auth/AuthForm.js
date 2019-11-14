import React, { Component } from 'react';

class AuthForm extends Component {

  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <div>
        <h1>AuthForm</h1>
        <form>
          <input type="text" value={this.state.email} placeholder="email" />
          <div />
          <input type="password" value={this.state.password} placeholder="password" />
          <div />
          <button>Log In</button>
          <span> or </span>
          <button>Sign Up</button>
        </form>
      </div>
    )
  }

}

export default AuthForm;