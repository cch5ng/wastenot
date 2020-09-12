var CronJob = require('cron').CronJob;
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { triggerPushMsg } = require('./pushMessage');
//const ListItemTable = require('../list_item/table');

if (process.env.NODE_ENV !== 'production') {
	const result = dotenv.config()

	if (result.error) {
  	throw result.error
	}
}

let max = process.env.NODE_ENV === 'development' ? 1: process.env.PGMAXCONNECTIONS;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
})

console.log('Before job instantiation');
const job = new CronJob('*/30 * * * * *', function() {
    //prod
    //new CronJob('* * 12 * * *', function() {
    //dev
    //new CronJob('*/30 * * * * *', function() {
    let respNotifications;
    let respUser;
    let respUserSubscription;
    let dictByListItemMapGuid;
    let mergedNotifications;
    let dictByUid;
    let mergedNotificationsSubscriptions;

    const d = new Date();
    console.log('Every 30 sec:', d);
    
    getNextDayNotifications(d)
        .then(resp => {
            if (resp && resp.list_items) {
                console.log('resp.list_items', resp.list_items);
                respNotifications = resp.list_items;
                Promise.all(
                    resp.list_items.map(listItem => {
                        let list_item_map_guid = listItem.list_item_map_guid
                        return getUserForListItemMapGuid(list_item_map_guid)
                    })
                )
                    .then(resp2 => {
                        console.log(resp2)
                        if (resp2.length) {
                            respUser = resp2;
                            let uniqueUserIds = getUniqueUserIdsAr(respUser);
                            dictByListItemMapGuid = getObjByListItemMapGuid(resp2);
                            mergedNotifications = mergeRespNotificationsRespUsers(respNotifications, dictByListItemMapGuid);
                            Promise.all(
                                uniqueUserIds.map(uid => {
                                    return getSubscriptionForUserId(uid)
                                })
                            )
                                .then(resp3 => {
                                    if (resp3.length) {
                                        respUserSubscription = resp3;
                                        dictByUid = getObjByUserId(resp3);
                                        mergedNotificationsSubscriptions = mergeNotificationsWithSubscriptions(mergedNotifications, dictByUid);
                                        //console.log('mergedNotificationsSubscriptions', mergedNotificationsSubscriptions)
                                        mergedNotificationsSubscriptions.forEach(sub => {
                                            let data = {
                                                list_item_id: sub.list_item_id,
                                                message: `Your ${sub.list_item_map_name} is about to expire.`
                                            }
                                            triggerPushMsg(JSON.parse(sub.push_subscription), JSON.stringify(data));
                                        })
                                    }
                                })
                                .catch(err => console.error('error', err))
                        }
                    })
                    .catch((err) => {console.error('error', err)})
            } else {
                let error = new Error('no results');
                error.statusCode = 401;
                console.error('error', error)
            }
        })
        .catch(err => console.error('error', err))
});
console.log('After job instantiation');
job.start();

/*
    data needed: name of list item; owner of list item; notify_timestamp; list_item_map_guid; list_item_id
    subscription data for the owner
*/
function getNextDayNotifications(time, notification_sent=false) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT list_item_map_guid, notify_timestamp, id AS list_item_id from list_item WHERE notify_timestamp <= $1 AND notification_sent=$2`,
        [time, notification_sent],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({list_items: response.rows});
          }
        }
      )
    })
  }

function getUserForListItemMapGuid(guid) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT user_id, name, guid from list_item_map WHERE guid = $1`,
            [guid],
            (error, response) => {
              if (error) return reject(error);
              if (response.rows.length) {
                resolve(response.rows[0]);
              }
            }
        )    
    })
}

function getSubscriptionForUserId(uid) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT DISTINCT id, push_subscription from wastenot_user WHERE id = $1`,
            [uid],
            (error, response) => {
              if (error) return reject(error);
              if (response.rows.length) {
                resolve(response.rows[0]);
              } else {
                resolve({message: 'no results found'})
              }
            }
        )    
    })
}

function getUniqueUserIdsAr(ar) {
    let uniqueUserIds = [];
    ar.forEach( cur => {
        if (uniqueUserIds.indexOf(cur.user_id) === -1) {
            uniqueUserIds.push(cur.user_id)
        }
    })
    return uniqueUserIds;
}

function getObjByListItemMapGuid(ar) {
    let resultObj = {};
    ar.forEach(el => {
        let list_item_map_guid = el.guid;
        resultObj[list_item_map_guid] = el;
    })
    return resultObj;
}

function getObjByUserId(ar) {
    let resultObj = {};
    ar.forEach(el => {
        let uid = el.id;
        resultObj[uid] = el;
    })
    return resultObj;
}

function mergeRespNotificationsRespUsers(respNotifications, dictByListItemMapGuid) {
    let merged = respNotifications.map(resp => {
        let map_guid = resp.list_item_map_guid;
        if (dictByListItemMapGuid[map_guid]) {
            resp.list_item_map_name = dictByListItemMapGuid[map_guid].name;
            resp.user_id = dictByListItemMapGuid[map_guid].user_id;
            //resp.list_item_id = resp.id;
            return resp;
        }
    })
    return merged;
}

function mergeNotificationsWithSubscriptions(mergedNotifications, dictByUid) {
    let merged = mergedNotifications.map(it => {
        let uid = it.user_id;
        if (dictByUid[uid]) {
            it.push_subscription = dictByUid[uid].push_subscription;
            return it;
        }
    })
    return merged;
}
