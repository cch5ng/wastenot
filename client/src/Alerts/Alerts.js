//functionality
//display food expiration alerts as list (recently passed, near upcoming) 
//allow user actions
    //postpone an alert (add one day onto the cur notification date)
    //cancel an alert ()
    //navigate to settings

import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import http_requests from '../utils/http_requests';

const Alerts = (props) => {

    function handlePostponeAlert() {
        
    }

    function handleCancelAlert() {

    }

    //get init list of alerts to display
    useEffect(() => {
        if (props.authenticate && props.authenticate.authStr) {
            http_requests.Lists.getRecentListItemNotifications({cookieStr: props.authenticate.authStr})
            .then(resp => console.log('resp', resp))
            .catch(err => console.error('err', err))
        }

    }, [props.authenticate.authStr]);

    return (
        <div>
            <h1>Alerts</h1>

        </div>
    )
}

const mapStateToProps = state => ({ 
    authenticate: state.authenticate
});
    
export default connect(
    mapStateToProps,
    null
)(Alerts);
