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
}

module.exports = SettingTable;
