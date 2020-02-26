const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');
const { hash } = require('./helper');

class AuthTable {
  static storeAccount({ emailHash, passwordHash }) {
    let guid = uuidv4();
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO wastenot_user ("emailHash", "passwordHash", guid) VALUES ($1, $2, $3) RETURNING id`,
        [emailHash, passwordHash, guid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            const userId = response.rows[0].id;
            console.log('userId', userId)
            resolve({ userId });
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

  static isAuthenticated({ sessionId, emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "emailHash", "sessionId" from wastenot_user WHERE ("emailHash"=$2 AND "sessionId"=$1)`,
        [sessionId, emailHash],
        (error, response) => {
          if (error) return reject(error);
          resolve({ account: response.rows[0] })
        })
    })
  }

  //userId, timezone
  //doublecheck where user_id is currently stored
  static storeUserTimezone({ timezone, emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE wastenot_user SET time_zone=$1 WHERE "emailHash"=$2`,
        [timezone, emailHash],
        (error, response) => {
          if (error) return reject(error);
          resolve({ message: `Timezone was saved for user`})
        })
    })
  }

  //userId
  //doublecheck where user_id is currently stored
  static getUserTimezone({ emailHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT time_zone FROM wastenot_user WHERE "emailHash"=$1`,
        [emailHash],
        (error, response) => {
          if (error) return reject(error);
          resolve({ time_zone: response.rows[0]})
        })
    })
  }

}

module.exports = AuthTable;
