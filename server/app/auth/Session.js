const uuid = require('./uuid');
const { hash } = require('./helper');

class Session {
  constructor({ email }) {
    this.email = email;
    this.id = uuid();
  }

  toString() {
    const { email, id } = this;
    return Session.sessionString({ email, id });
  }

  static accountData({ email, id }) {
    return `${email}|${id}`;
  }

  static sessionString({ email, id }) {
    const accountData = Session.accountData({ email, id });
    return `${accountData}|${hash(accountData)}`;
  }
}

module.exports = Session;