import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';
import InternalNotification from '../InternalNotification/InternalNotification';
import http_requests from '../../utils/http_requests';
import { getCookieStr } from '../../utils/utils';

const Header = (props) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);
  const [globalHideInternalNotification, setGlobalHideInternalNotification] = useState(false);
  const [userMappedListItemsToExpiration, setUserMappedListItemsToExpiration] = useState(true);
  const [userClosedInternalNotification, setUserClosedInternalNotification] = useState(false);
  const [userVisitedSettingMapListItemsToExpiration, setUserVisitedSettingMapListItemsToExpiration] = useState(false);

  const logOutHandler = (ev) => {
    props.logout();
  }

  const toggleMenu = (ev) => {
    setMenuDisplayed(!menuDisplayed)
  }

  const notificationCloseHandler = (ev) => {
    setUserClosedInternalNotification(true);
  }

  const internalNotificationLinkClickHandler = (ev) => {
    setUserVisitedSettingMapListItemsToExpiration(true);
  }

  useEffect(() => {
    if (props.authenticate.authStr) {
      let cookie = getCookieStr();
      http_requests.Setting.postListItemMapSetting(cookie)
        .then(resp => {
          setUserMappedListItemsToExpiration(resp.mapped_items_to_categories);
        });
    }
  }, [props.authenticate.authStr]);

  if (!menuDisplayed) {
    return (
      <div className="header title">
        {!globalHideInternalNotification || !userMappedListItemsToExpiration || !userVisitedSettingMapListItemsToExpiration || !userClosedInternalNotification && (
          <InternalNotification clickCloseHandler={internalNotificationCloseHandler} />
        )}
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
        {!globalHideInternalNotification || !userMappedListItemsToExpiration || !userVisitedSettingMapListItemsToExpiration || !userClosedInternalNotification && (
          <InternalNotification />
        )}
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
