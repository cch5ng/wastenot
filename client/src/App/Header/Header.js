import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return (
    <div className="header title">
      <div className="header-main">
        <h2><Link to="/" className="header-main">Seed to Soul</Link></h2>
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

    </div>
  )
}

export default Header;

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