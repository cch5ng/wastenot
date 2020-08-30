const uuidv4 = require('uuid/v4');
const db = require('../../databasePool');
const { section_name_to_id } = require('../utils/constants');

class ListItemTable {
  // list items for template list
  static storeListItem({ name, list_guid, list_item_guid, sortOrder }) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO list_item (name, list_guid, guid, sort_order) VALUES ($1, $2, $3, $4) RETURNING list_guid`,
        [name, list_guid, list_item_guid, sortOrder],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({ list_guid });
          }
        }
      )
    })
  }

  static storeShoppingListItem({ name, list_guid, list_item_guid, sortOrder, checked, list_item_map_guid, timestamp, notify_timestamp, notification_sent }) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO list_item (name, list_guid, guid, sort_order, checked, list_item_map_guid, timestamp, notify_timestamp, notification_sent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING list_guid`,
        [name, list_guid, list_item_guid, sortOrder, checked, list_item_map_guid, timestamp, notify_timestamp, notification_sent],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve(response);
          }
        }
      )
    })
  }

  //probably want to get everything like name plus the list items
  static getListItemsByListGuid({ listGuid }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT list_item.guid, list_item.name, list_item.sort_order, list_item.list_guid, list_item.checked, list_item.list_item_map_guid from list_item WHERE list_guid = $1 ORDER BY list_item.sort_order`,
        [listGuid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({listItems: response.rows});
          }
        }
      )
    })
  }

  static updateListItem({ name, guid, sort_order}) {
    //const { guid, name, sort_order } = listItem;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE list_item SET name = $2, sort_order = $3 WHERE guid = $1 RETURNING guid`,
        [guid, name, sort_order],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({list_item_guid: response.rows[0].guid});
          }
        }
      )
    })
  }

  static updateShoppingListItem({ name, guid, sort_order, checked, list_item_map_guid, timestamp, notify_timestamp, notification_sent }) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE list_item SET name=$2, sort_order=$3, checked=$4, list_item_map_guid=$5, timestamp=$6, notify_timestamp=$7, notification_sent=$8 WHERE guid = $1 RETURNING guid`,
        [guid, name, sort_order, checked, list_item_map_guid, timestamp, notify_timestamp, notification_sent],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({list_item_guid: response.rows[0].guid});
          }
        }
      )
    })
  }

  static updateListItems(listItems) {
    return Promise.all(
      listItems.map(listItem => {
        const { name, guid, sort_order } = listItem;
        return ListItemTable.updateListItem({ name, guid, sort_order })
      })
    )
  }

  static updateShoppingListItems(listItems) {
    return Promise.all(
      listItems.map(listItem => {
        const { name, guid, sort_order, checked, list_item_map_guid, timestamp, notify_timestamp, notification_sent } = listItem;
        return ListItemTable.updateShoppingListItem({ name, guid, sort_order, checked, list_item_map_guid, timestamp, notify_timestamp, notification_sent })
      })
    )
  }

  //ListItemTable.updateNotificationSent({id: list_item_id})
  static updateNotificationSent({ id }) {
    return new Promise((resolve, reject) => {
      const notification_sent = true;
      db.query(
        `UPDATE list_item SET notification_sent=$1 WHERE id = $2 RETURNING id`,
        [notification_sent, id],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({list_item_id: response.rows[0].id});
          }
        }
      )
    })
  }



  static deleteListItemByItemGuid(itemGuid) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE from list_item WHERE guid = $1 RETURNING guid`,
        [itemGuid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({list_item_guid: response.rows[0].guid})
          }
        }
      )
    })
  }

  // static deleteListItemsByItemGuid(itemGuids) {
  //  return Promise.all(
  //    itemGuids.map(guid => ListItemTable.deleteListItemByItemGuid(guid))
  //  )
  // }

  static deleteListItemByListGuid(guid) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE from list_item WHERE list_guid = $1 RETURNING guid`,
        [guid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({list_item_guid: response.rows[0].guid});
          }
        }
      )
    })
  }

// section for food expiration notifications
  static getRecentNotificationsByEmail(emailHash) {
    const notification_sent = false;
    let curTimestampMs = Date.now();
    let lastWeekTimestamp = new Date(curTimestampMs);
    lastWeekTimestamp.setDate(lastWeekTimestamp.getDate() - 7);
    let nextWeekTimestamp = new Date(curTimestampMs);
    nextWeekTimestamp.setDate(nextWeekTimestamp.getDate() + 7);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT lim.name, li.notify_timestamp, li.guid
         FROM wastenot_user u, list_item_map lim, list_item li
         WHERE u.id=lim.user_id AND u."emailHash"=$1 AND lim.guid=li.list_item_map_guid
         AND li.notification_sent=$2
         AND li.notify_timestamp > $3
         ORDER BY li.notify_timestamp`,
        [emailHash, notification_sent, lastWeekTimestamp, nextWeekTimestamp],
        (error, response) => {
          if (error) return reject(error);
          if (response) {
            resolve(response);
          }
        }
      )
    })
  }

  static putPostponeNotificationByListItemId(timestamp, guid) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE list_item SET notify_timestamp=$1
         WHERE guid=$2 RETURNING guid, notify_timestamp`,
        [timestamp, guid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({
              message: `List item notification was postponed.`, 
              guid: response.rows[0].guid, 
              notify_timestamp: response.rows[0].notify_timestamp
            });
          }
        }
      )
    })
  }

  static putCancelNotificationByListItemId(guid) {
    const notification_sent = true;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE list_item SET notification_sent=$1
         WHERE guid=$2 RETURNING guid`,
        [notification_sent, guid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({message: `List item notification was cancelled.`, guid});
          }
        }
      )
    })
  }

}

module.exports = ListItemTable;
