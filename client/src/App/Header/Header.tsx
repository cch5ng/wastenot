import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';
import InternalNotification from '../InternalNotification/InternalNotification';
import http_requests from '../../utils/http_requests';
import { getCookieStr } from '../../utils/utils';

type HeaderProps = {
  logout: any,
  authenticate: {
    isLoggedIn: boolean,
    hasButtonClicked: boolean,
    status: string,
    message: string,
    authStr: string,
  }
}
const Header = (props: HeaderProps) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);
  const [globalHideInternalNotification, setGlobalHideInternalNotification] = useState(false);
    //refactor so when user runs first mapping test, this should update the database and that should update the globalHideInternalNotification setting on render
  const [sessionHideInternalNotification, setSessionHideInternalNotification] = useState(false);
  
  let logOutHandler = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    props.logout();
  };

  const toggleMenu = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    setMenuDisplayed(!menuDisplayed)
  };

  const notificationCloseHandler = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    setSessionHideInternalNotification(true);
  }

  const notificationCloseGlobalHandler = function(
    //not sure of HTMLDivElement
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    let cookie = getCookieStr();
    http_requests.Setting.putListItemMapSetting(cookie)
      .then(resp => {
        setGlobalHideInternalNotification(true);
      });
  }

  useEffect(() => {
    if (props.authenticate.authStr) {
      let cookie = getCookieStr();
      http_requests.Setting.postListItemMapSetting(cookie)
        .then(resp => {
          setGlobalHideInternalNotification(resp.mapped_items_to_categories);
        });
    }
  }, [props.authenticate.authStr]);

  if (!menuDisplayed) {
    return (
      <div className="header title">
        {!globalHideInternalNotification && !sessionHideInternalNotification && (
          <InternalNotification clickCloseHandler={notificationCloseHandler} checkboxSelectHandler={notificationCloseGlobalHandler} />
        )}
        <div className="headerMain">
          <h2><Link to="/" className="title">Waste Not</Link></h2>
        </div>
        <div className="menu-links-medium">
          <p className="menu-link-item">
            <Link to="/shoppingLists">Shopping Lists</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/alerts">Alerts</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings">Settings</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/expirationMapTest">Alert Setup</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/support">Support</Link>
          </p>
        </div>
        <div className="headerNav">
          <p className="nav-link" onClick={logOutHandler} >Log Out</p>
          <p className="nav-link menu-text" onClick={toggleMenu} >Menu</p>
        </div>
      </div>
    )
  }

  if (menuDisplayed) {
    return (
      <div className="menu">
        {!globalHideInternalNotification && !sessionHideInternalNotification && (
          <InternalNotification clickCloseHandler={notificationCloseHandler} 
            checkboxSelectHandler={notificationCloseGlobalHandler} />
        )}
        <div className="icon" onClick={toggleMenu} >X</div>
        <div className="menu-links">
          <p className="menu-link-item">
            <Link to="/shoppingLists">Shopping Lists</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/alerts">Alerts</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings">Settings</Link>
          </p>
          <p className="menu-link-item">
            <Link to="/settings/expirationMapTest">Alert Setup</Link>
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
