import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

const InternalNotification = (props) => {
  return (
    <div className="internalNotification">
      This is a reminder to <Link to="/settings/expirationMapTest" onClick={props.clickCloseHandler}>set up mapping between your shopping list items and expiration dates.</Link>
      <div onClick={props.clickCloseHandler}>X</div>
    </div>
  )
}

export default InternalNotification;
