//functionality
//display food expiration alerts as list (recently passed, near upcoming) 
//allow user actions
    //postpone an alert (add one day onto the cur notification date)
    //cancel an alert ()
    //navigate to settings

import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import http_requests from '../utils/http_requests';
import Button from '../App/Shared/Button/Button';

const Alerts = (props) => {
    const [alertsAr, setAlertsAr] = useState([]);
    const [alertsObj, setAlertsObj] = useState({});

    function handlePostponeAlert(ev) {
        ev.preventDefault();
        const className = ev.target.className;
        const classAr = className.split(' ')
        const guid = classAr[classAr.length - 1];
        let notify_timestamp = alertsObj[guid].notify_timestamp;
        let newNotifyTimestamp = new Date(notify_timestamp);
        newNotifyTimestamp.setDate(newNotifyTimestamp.getDate() + 1);

        if (props.authenticate && props.authenticate.authStr) {
            http_requests.Lists.putPostponeListItemNotification({
                list_item_guid: guid,
                timestamp: newNotifyTimestamp, //newNotifyTimestamp,
                cookieStr: props.authenticate.authStr
            })
                .then(resp => console.log('resp', resp))
                .catch(err => console.error('err', err))
        }
    }

    function handleCancelAlert(ev) {
        ev.preventDefault();
        const className = ev.target.className;
        const classAr = className.split(' ')
        const guid = classAr[classAr.length - 1];

        if (props.authenticate && props.authenticate.authStr) {
            http_requests.Lists.putCancelListItemNotification({
                list_item_guid: guid,
                cookieStr: props.authenticate.authStr
            })
                .then(resp => console.log('resp', resp))
                .catch(err => console.error('err', err))
        }
    }

    function getAlertsObj(ar) {
        let alertsObj = {};
        ar.forEach(alert => {
            const guid = alert.guid;
            alertsObj[guid] = alert;
        })
        return alertsObj;
    }

    //get init list of alerts to display
    useEffect(() => {
        if (props.authenticate && props.authenticate.authStr) {
            http_requests.Lists.getRecentListItemNotifications({cookieStr: props.authenticate.authStr})
            .then(resp => {
                console.log('resp', resp);
                if (resp && resp.notifications) {
                    setAlertsAr(resp.notifications);
                    let alertsObj = getAlertsObj(resp.notifications);
                    setAlertsObj(alertsObj);
                }
            })
            .catch(err => console.error('err', err))
        }
    }, [props.authenticate.authStr]);

    return (
        <div>
            <h1>Alerts</h1>
            {alertsAr.map(alert =>
                (<div>
                    <p>{alert.name} will expire on {alert.notify_timestamp}</p>
                    <Button onClickHandler={handlePostponeAlert} label="Postpone (1 day)" classVal={alert.guid}/>
                    <Button onClickHandler={handleCancelAlert} label="Cancel alert" classVal={alert.guid}/>
                </div>)
            )}

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
