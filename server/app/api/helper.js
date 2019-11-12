const Session = require('../auth/Session');
const AuthTable = require('../auth/table');
const { hash } = require('../auth/helper');

const setSession = ({ email, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session;
    let sessionStr;

    //case user already has sessionId saved in db
    if (sessionId) {
      sessionStr = Session.sessionString({ email, id: sessionId });
      setSessionCookie({ sessionStr, res });
      resolve({ message: 'session restored'});
    } else {
      //case no user sessionId found in db
      session = new Session({ email });
      sessionStr = session.toString();

      AuthTable.updateSessionId({ 
        sessionId: session.id,
        emailHash: hash(email)
      })
        .then(() => {
          setSessionCookie({ sessionStr, res });
          resolve({ message: 'session created' });
        })
        .catch(err => reject(err))
    }
  });
}

const setSessionCookie = ({ sessionStr, res }) => {
  res.cookie('sessionStr', sessionStr, {
    expire: Date.now() + 3600000,
    httpOnly: true
    //secure: true
  });
}

module.exports = { setSession }