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
import './style.css';

const Alerts = (props) => {
    const [alertsAr, setAlertsAr] = useState([]);
    const [alertsObj, setAlertsObj] = useState({});
    const [daysUntilExpiration, setDaysUntilExpiration] = useState(7);

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
                .then(resp => {
                    let guid = resp.guid;
                    let notify_timestamp = resp.notify_timestamp;
                    let oldAlertsObj = Object.assign({}, alertsObj);
                    setAlertsObj({...oldAlertsObj, [guid]: {...oldAlertsObj[guid], notify_timestamp }})
                })
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
                .then(resp => {
                    let guidToRemove = resp.guid;
                    let newAlertsObj = {...alertsObj};
                    delete newAlertsObj[guidToRemove]
                    setAlertsObj(newAlertsObj);
                })
                .catch(err => console.error('err', err))
        }
    }

    function handleRangeChange(ev) {
        let daysCount = ev.target.value;
        setDaysUntilExpiration(daysCount);
    }

    function getAlertsObj(ar) {
        let alertsObj = {};
        ar.forEach(alert => {
            const guid = alert.guid;
            alertsObj[guid] = alert;
        })
        return alertsObj;
    }

    function getFilteredAlerts() {
        let n = Date.now();
        let additionalMs = convertDayToMs(daysUntilExpiration);
        let thresholdMs = n + additionalMs;

        let filteredAlerts = alertsAr.filter(alert => {
            let expiryMs = convertISOStrToMs(alert.notify_timestamp);
            return expiryMs <= thresholdMs;
        })
        return filteredAlerts;

    }

    function convertISOStrToMs(isoStr) {
        let d = new Date(isoStr);
        return d.getTime();
    }

    function convertDayToMs(dayCnt) {
        return dayCnt * 24 * 60 * 60 * 1000;
    }

    //get init list of alerts to display
    useEffect(() => {
        if (props.authenticate && props.authenticate.authStr) {
            http_requests.Lists.getRecentListItemNotifications({cookieStr: props.authenticate.authStr})
            .then(resp => {
                if (resp && resp.notifications) {
                    setAlertsAr(resp.notifications);
                    let alertsObj = getAlertsObj(resp.notifications);
                    setAlertsObj(alertsObj);
                }
            })
            .catch(err => console.error('err', err))
        }
    }, [props.authenticate.authStr]);

    useEffect(() => {
        let newAlertsAr = getAlertsArFromObj(alertsObj)
        setAlertsAr(newAlertsAr);    
    }, [alertsObj])

    let filteredAlerts = daysUntilExpiration === 7 ? alertsAr : getFilteredAlerts();
    return (
        <div className="main">
            <h1>Alerts</h1>
            <div>
                <h2>Filter Alerts</h2>
                <div className="form_group">
                    <input type="range" id="days_until_expiration" name="days_until_expiration"
                        onChange={handleRangeChange}
                        min="1" max="7" className="input_range" />
                    <label htmlFor="days_until_expiration">Days until expiration ({daysUntilExpiration})</label>
                </div>
            </div>
            {filteredAlerts.map(alert => {
                let newDate = new Date(alert.notify_timestamp);
                return (<div className="row row-left" key={alert.guid}>
                    <p>{alert.name} will expire on {newDate.toDateString()}</p>
                    <Button onClickHandler={handlePostponeAlert} label="+1 day" 
                        classVal={alert.guid} size="extra-small" noMargin={true}/>
                    <Button onClickHandler={handleCancelAlert} label="Cancel" 
                        classVal={alert.guid} size="extra-small" noMargin={true}/>

                </div>)
            })}
        </div>
    )
}

function getAlertsArFromObj(alertsObj) {
    let alertsAr = [];
    for (let guid in alertsObj) {
        alertsAr.push(alertsObj[guid]);
    }
    return alertsAr;
}

const mapStateToProps = state => ({ 
    authenticate: state.authenticate
});
    
export default connect(
    mapStateToProps,
    null
)(Alerts);
