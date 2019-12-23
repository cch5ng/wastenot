import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';

const AuthHeader = (props) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const logOutHandler = (ev) => {
    props.logout();
  }

  const toggleMenu = (ev) => {
    console.log('clicked Menu')
    setMenuDisplayed(!menuDisplayed)

  }

        // <p className="nav-link">
        //   <Link to="/">Login</Link>
        // </p>

  if (!menuDisplayed) {
    return (
      <div className="header title">
        <div className="header-main">
          <h2><Link to="/" className="title">Waste Not</Link></h2>
        </div>
        <div className="header-nav">
          <p className="action-link">
            <Link to="/signup">Sign Up</Link>
          </p>
          <p className="nav-link" onClick={toggleMenu} >Menu</p>
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
            <Link to="/">Nav Item</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/">Nav Item2</Link>
          </p>
        </div>
        <div className="menu-buttons">
          <div className="div-button">
            <Link to="/signup">Sign </Link>
          </div>
          <div className="div-button">
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
