import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';
import Checkbox from '../Shared/Checkbox/Checkbox';

const InternalNotification = (props) => {
  return (
    <div className="internalNotification">
      <div className="controlClose" onClick={props.clickCloseHandler}>X</div>
      <p>This is a reminder to <Link to="/settings/expirationMapTest" onClick={props.clickCloseHandler}>set up mapping between your shopping list items and expiration dates.</Link></p>
      <form>
        <Checkbox checkboxVal={false} checkboxLabel="Hide this message in the future" onChangeHandler={props.checkboxSelectHandler} />
      </form>
    </div>
  )
}

export default InternalNotification;
