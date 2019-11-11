const Session = require('../auth/Session');
const AuthTable = require('../auth/table');
const { hash } = require('../auth/helper');

const setSession = ({ email, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ email });
    const sessionStr = session.toString();

    AuthTable.updateSessionId({ 
      sessionId: session.id,
      emailHash: hash(email)
    })
      .then(() => {
        res.cookie('sessionStr', sessionStr, {
          expire: Date.now() + 3600000,
          httpOnly: true
          //secure: true
        });

        resolve({ message: 'session created' });
      })
      .catch(err => reject(err))

  });
}

module.exports = { setSession }