const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');

class AuthTable {

  static storeAccount(body) {
    const { email, password } = body;
    let user_guid = uuidv4();
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO wastenot_user (email, password, guid) VALUES ($1, $2, $3) RETURNING guid`,
        [email, password, user_guid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            const userGuid = response.rows[0].guid;
            resolve({ userGuid });
          }
        }
      )
    })
  }


}

module.exports = AuthTable;