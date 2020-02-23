import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

const InternalNotification = (props) => {

  return (
    <div className="internalNotification">
      This is a reminder to <Link to="/settings/expirationMapTest">set up mapping between your shopping list items and expiration dates.</Link>
      <div onClick={props.clickCloseHandler}>X</div>
    </div>
  )
}

export default InternalNotification;

// const mapStateToProps = state => ({ setting: state.setting });

// const mapDispatchToProps = dispatch => {
//   return {
//     //register: ({ email, password }) => dispatch(register({ email, password }))
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps)(InternalNotification);
