import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';

const Header = (props) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const logOutHandler = (ev) => {
    props.logout();
  }

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
            <Link to="/shoppingLists">Shopping Lists</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/shoppingLists/new">New Shopping List</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/listTemplatesNew">New Template</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/listTemplates">Templates</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings">Settings</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/expirationMapTest">Expiration Map Test</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/about">About</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/support">Support</Link>
          </p>
        </div>
        <div className="header-nav">
          <p className="nav-link" onClick={logOutHandler} >Log Out</p>
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
            <Link to="/shoppingLists">Shopping Lists</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/shoppingLists/new">New Shopping List</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/listTemplatesNew">New Template</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/listTemplates">Templates</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings">Settings</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/expirationMapTest">Expiration Map Test</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/about">About</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/support">Support</Link>
          </p>
        </div>
        <div className="menu-buttons">
          <div className="div-button log-in-button" onClick={logOutHandler} >Log Out</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
