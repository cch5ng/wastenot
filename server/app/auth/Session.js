const uuidv4 = require('uuid/v4');
const { hash } = require('./helper');

const SEPARATOR = '|';

class Session {
  constructor({ email }) {
    this.email = email;
    this.id = uuidv4();
  }

  toString() {
    const { email, id } = this;
    return Session.sessionString({ email, id });
  }

  //convert string formatted session data to obj
  static parse(sessionStr) {
    const sessionAr = sessionStr.split(SEPARATOR);

    return {
      email: sessionAr[0],
      id: sessionAr[1],
      sessionHash: sessionAr[2]
    };
  }

  static verify(sessionStr) {
    const { email, id, sessionHash } = Session.parse(sessionStr);
    const acData = Session.accountData({ email, id });

    return hash(acData) === sessionHash;
  }

  static accountData({ email, id }) {
    return `${email}${SEPARATOR}${id}`;
  }

  static sessionString({ email, id }) {
    const accountData = Session.accountData({ email, id });
    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }
}

module.exports = Session;