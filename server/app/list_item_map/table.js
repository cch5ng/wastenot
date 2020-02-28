const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');

class ListItemMapTable {
  // list items for template list
  static storeListItemMap({ listItemMap, user_id }) {
    return new Promise((resolve, reject) => {
      const { name, expirationDays } = listItemMap;
      pool.query(
        `INSERT INTO list_item_map (name, expiration_days, user_id) VALUES ($1, $2, $3) RETURNING name`,
        [name, expirationDays, user_id],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({ name });
          }
        }
      )
    })
  }

}

module.exports = ListItemMapTable;
