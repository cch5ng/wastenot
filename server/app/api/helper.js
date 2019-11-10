const Session = require('../auth/Session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ email, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ email });
    const sessionStr = session.toString();

    AccountTable.updateSessionId({ 
      sessionId: session.id,
      emailHash: hash(email)
    });

    res.cookie('sessionStr', sessionStr, {
      expire: Date.now() + 3600000,
      httpOnly: true,
      //secure: true
    });
  });
}

module.exports = { setSession }