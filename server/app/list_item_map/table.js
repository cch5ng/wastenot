const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');

class ListItemMapTable {

  static storeListItemMap({ listItemMap, user_id }) {
    return new Promise((resolve, reject) => {
      const { name, expirationDays, skipNotification } = listItemMap;
      pool.query(
        `INSERT INTO list_item_map (name, expiration_days, user_id, skip_notification) VALUES ($1, $2, $3, $4) RETURNING name`,
        [name, expirationDays, user_id, skipNotification],
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
      console.log('user_id', user_id)
      pool.query(
        `SELECT name, expiration_days, guid FROM list_item_map WHERE user_id=$1`,
        [user_id],
        (error, response) => {
          if (error) return reject(error);
          console.log('response', response)
          if (response.rows.length) {
            resolve(response.rows);
          }
        }
      )
    })
  }

}

module.exports = ListItemMapTable;
