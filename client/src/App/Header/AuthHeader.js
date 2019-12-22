import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';

const AuthHeader = (props) => {

  const logOutHandler = (ev) => {
    //ev.preventDefault();
    props.logout();
  }

  return (
    <div className="header title">
      <div className="header-main">
        <h2><Link to="/" className="header-main">Waste Not</Link></h2>
      </div>

      <div className="header-contact">
        <p className="nav-link">
          <Link to="/">Login</Link>
        </p>
      </div>
      <div className="header-contact">
        <p className="nav-link">
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  authenticate: state.authenticate
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHeader)
