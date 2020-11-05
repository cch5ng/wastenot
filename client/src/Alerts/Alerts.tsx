import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import http_requests from '../utils/http_requests';
import Button from '../App/Shared/Button/Button';
import './Alerts.css';

type AlertsProps = {
    authenticate: {
        isLoggedIn: boolean,
        hasButtonClicked: boolean,
        status: string,
        message: string,
        authStr: string,
    }    
}
const Alerts = (props: AlertsProps) => {
    const [alertsAr, setAlertsAr] = useState([]);
    const [alertsObj, setAlertsObj] = useState({});
    const [daysUntilExpiration, setDaysUntilExpiration] = useState(7);

    let handlePostponeAlert = function(
        event: React.MouseEvent<HTMLDivElement>
        ): void {
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        const {className} = target;
        const classAr = className.split(' ')
        const guid = classAr[classAr.length - 1];
        let notify_timestamp = alertsObj[guid].notify_timestamp;
        let newNotifyTimestamp = new Date(notify_timestamp);
        newNotifyTimestamp.setDate(newNotifyTimestamp.getDate() + 1);

        if (props.authenticate && props.authenticate.authStr) {
            http_requests.Lists.putPostponeListItemNotification({
                list_item_guid: guid,
                timestamp: newNotifyTimestamp,
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

    let handleCancelAlert = function(
        event: React.MouseEvent<HTMLDivElement>
        ): void {
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        const {className} = target;
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

    let handleRangeChange = function(
        event: React.FormEvent<HTMLInputElement>
        ): void {
            const target = event.target as HTMLInputElement;
            let daysCount = target.value;
        setDaysUntilExpiration(parseInt(daysCount, 10));
    }

    let getAlertsObj = function(ar: {guid: string}[]): object {
        let alertsObj = {};
        ar.forEach(alert => {
            const guid = alert.guid;
            alertsObj[guid] = alert;
        })
        return alertsObj;
    }

    let getFilteredAlerts = function(): object[] {
        let n = Date.now();
        let additionalMs = convertDayToMs(daysUntilExpiration);
        let thresholdMs = n + additionalMs;

        let filteredAlerts = alertsAr.filter(alert => {
            let expiryMs = convertISOStrToMs(alert.notify_timestamp);
            return expiryMs <= thresholdMs;
        })
        return filteredAlerts;
    }

    let convertISOStrToMs = function(isoStr: string): number {
        let d = new Date(isoStr);
        return d.getTime();
    }

    let convertDayToMs = function(dayCnt: number): number {
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

    let filteredAlerts: {name: string, guid: string, notify_timestamp: string}[] 
        = daysUntilExpiration === 7 ? alertsAr : getFilteredAlerts();
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
                        classVal={alert.guid} size="extra-small" noMargin={true}
                        idVal='' type={null}/>
                    <Button onClickHandler={handleCancelAlert} label="Cancel" 
                        classVal={alert.guid} size="extra-small" noMargin={true}
                        idVal='' type={null}/>
                </div>)
            })}
        </div>
    )
}

let getAlertsArFromObj = function(alertsObj: object): object[] {
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
