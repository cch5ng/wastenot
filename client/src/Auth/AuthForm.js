import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, fetchAuthLogin } from '../actions/authenticate';

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
    //this.props.fetchAuthLogin(email, password);
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
    console.log('this.props.authenticate', this.props.authenticate)
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
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({ authenticate: state.authenticate });

export default connect(
  mapStateToProps,
  { register, fetchAuthLogin})(AuthForm);
