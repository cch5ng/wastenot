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

  static getAccount({ emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "passwordHash", "sessionId" from wastenot_user WHERE "emailHash"=$1`,
        [emailHash],
        (error, response) => {
          if (error) return reject(error);
          resolve({ account: response.rows[0] })
        }
      )
    })
  }

  static updateSessionId({ sessionId, emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE wastenot_user SET "sessionId"=$1 WHERE "emailHash"=$2`,
        [sessionId, emailHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      )
    })
  }
}

module.exports = AuthTable;
