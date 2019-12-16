import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logout } from '../../actions/authenticate';

const Header = (props) => {

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
          <Link to="/settings/listTemplatesNew">New Template</Link>
        </p>
      </div>
      <div className="header-contact">
        <p className="nav-link">
          <Link to="/settings/listTemplates">Templates</Link>
        </p>
      </div>

      {props.authenticate.isLoggedIn && (
        <div>
          <button onClick={logOutHandler}>Log Out</button>
        </div>
      )}

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

export default connect(mapStateToProps, mapDispatchToProps)(Header)

// export default Header;

/*
        <p className="nav-link">
          <Link to="/lists">Lists</Link>
        </p>
        <p className="nav-link">
          <Link to="/listsNew">New List</Link>
        </p>


        <p className="nav-link">
          <Link to="/settings/store_sections">Store Sections</Link>
        </p>
*/