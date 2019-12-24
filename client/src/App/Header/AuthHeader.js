import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';

const AuthHeader = (props) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const toggleMenu = (ev) => {
    setMenuDisplayed(!menuDisplayed)
  }

  if (!menuDisplayed) {
    return (
      <div className="header title">
        <div className="header-main">
          <h2><Link to="/" className="title">Waste Not</Link></h2>
        </div>
        <div className="menu-links-medium">
          <p className="menu-link-item">
            <Link to="/about">About</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/support">Support</Link>
          </p>
        </div>
        <div className="header-nav">
          <p className="nav-link">
            <Link to="/">Log In</Link>
          </p>
          <p className="action-link">
            <Link to="/signup">Sign Up</Link>
          </p>
          <p className="nav-link menu-text" onClick={toggleMenu} >Menu</p>
        </div>
      </div>
    )
  }

  if (menuDisplayed) {
    return (
      <div className="menu">
        <div className="icon" onClick={toggleMenu} >X</div>
        <div className="menu-links">
          <p className="menu-link-item">
            <Link to="/about">About</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/support">Support</Link>
          </p>
        </div>
        <div className="menu-buttons">
          <div className="div-button sign-up-button">
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="div-button log-in-button">
            <Link to="/">Log In</Link>
          </div>
        </div>
      </div>
    )
  }

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
