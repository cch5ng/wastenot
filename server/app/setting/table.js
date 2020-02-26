const pool = require('../../databasePool');

class SettingTable {

    static storeMappedItemsSetting({ user_id }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO setting (user_id) VALUES ($1) RETURNING user_id`,
                [user_id],
                (error, response) => {
                  if (error) return reject(error);
                  if (response.rows.length) {
                    const userId = response.rows[0].user_id;
                    resolve({ user_id });
                  }
                }
            )
        })
      }

      static getListItemMapping({ user_id }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT  mapped_items_to_categories FROM setting WHERE user_id=$1`,
                [user_id],
                (error, response) => {
                  if (error) return reject(error);
                  if (response.rows.length) {
                    const mapped_items_to_categories = response.rows[0].mapped_items_to_categories;
                    resolve({ mapped_items_to_categories });
                  }
                }
            )
        })
      }

      static updateListItemMapping({ user_id }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE setting SET mapped_items_to_categories=true WHERE user_id=$1`,
                [user_id],
                (error, response) => {
                  if (error) return reject(error);
                  resolve({ message: 'setting was updated' })
                  // if (response.rows.length) {
                  //   const mapped_items_to_categories = response.rows[0].mapped_items_to_categories;
                  //   resolve({ mapped_items_to_categories });
                  // }
                }
            )
        })
      }
}

module.exports = SettingTable;
