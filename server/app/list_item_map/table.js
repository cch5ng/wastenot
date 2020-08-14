const db = require('../../databasePool');
const uuidv4 = require('uuid/v4');

class ListItemMapTable {
  static storeListItemMap({ listItemMap, user_id }) {
    return new Promise((resolve, reject) => {
      const { name, expirationMs, skipNotification } = listItemMap;
      const guid = uuidv4();
      db.query(
        `INSERT INTO list_item_map (name, expiration_ms, user_id, skip_notification, guid) VALUES ($1, $2, $3, $4, $5) RETURNING name`,
        [name, expirationMs, user_id, skipNotification, guid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({ name });
          }
        }
      )
    })
  }

  static getMappedListItemsByUserId({ user_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, expiration_ms, guid FROM list_item_map WHERE user_id=$1`,
        [user_id],
        (error, response) => {
          if (error) return reject(error);
          resolve(response);
        }
      )
    })
  }
}

module.exports = ListItemMapTable;
