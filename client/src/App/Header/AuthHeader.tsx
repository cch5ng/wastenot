import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';
import Button from '../Shared/Button/Button';

type AuthHeaderProps = {
  logout: any,
  authenticate: {
    isLoggedIn: boolean,
    hasButtonClicked: boolean,
    status: string,
    message: string,
    authStr: string,
  }
}
const AuthHeader = (props: AuthHeaderProps) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);
  let history = useHistory();

  let toggleMenu = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {  
    setMenuDisplayed(!menuDisplayed);
  }

  let handleSignUpBtn = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {    
    toggleMenu(event);
    history.push('/signup');
  }

  let handleLogInBtn = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {    
    toggleMenu(event);
    history.push('/');
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
          <p className="action-link">
            <Link to="/signup">Sign Up</Link>
          </p>
          <p className="nav-link">
            <Link to="/">Log In</Link>
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
          <Button label="Sign Up" onClickHandler={handleSignUpBtn} size="extra-large" type="important"
            classVal="" idVal="" noMargin={false}/>
          <Button label="Log In" onClickHandler={handleLogInBtn} size="extra-large" type="neutral"
            classVal="" idVal="" noMargin={false}/>
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
