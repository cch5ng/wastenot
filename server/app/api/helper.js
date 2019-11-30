const Session = require('../auth/Session');
const AuthTable = require('../auth/table');
const { hash } = require('../auth/helper');

const setSession = ({ email, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session;
    let sessionStr;
    let cookie;

    //case user already has sessionId saved in db
    if (sessionId) {
      sessionStr = Session.sessionString({ email, id: sessionId });
      cookie = setSessionCookie({ sessionStr, res });
      resolve({ ...cookie, message: 'session restored' });
    } else {
      //case no user sessionId found in db
      session = new Session({ email });
      sessionStr = session.toString();

      AuthTable.updateSessionId({ 
        sessionId: session.id,
        emailHash: hash(email)
      })
        .then(() => {
          cookie = setSessionCookie({ sessionStr, res });
          resolve({ ...cookie, message: 'session created' });
        })
        .catch(err => reject(err))
    }
  });
}

const setSessionCookie = ({ sessionStr, res }) => {
  return {cookie: `sessionStr=${sessionStr}`}
}

module.exports = { setSession }

  //TODO test whether is this required?
  // res.cookie('sessionStr', sessionStr, {
  //   expire: Date.now() + 3600000,
  //   httpOnly: true
  //   //secure: true
  // });
  //res.setHeader('Set-Cookie', [`sessionStr=${sessionStr}`]);
