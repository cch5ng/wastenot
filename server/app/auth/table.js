const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');
const { hash } = require('./helper');

class AuthTable {
  static storeAccount({ emailHash, passwordHash }) {
    let guid = uuidv4();
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO wastenot_user ("emailHash", "passwordHash", guid) VALUES ($1, $2, $3) RETURNING guid`,
        [emailHash, passwordHash, guid],
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
