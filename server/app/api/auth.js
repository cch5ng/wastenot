const { Router } = require('express');
const AuthTable = require('../auth/table');
const SettingTable = require('../setting/table');
const Session = require('../auth/Session');
const { hash } = require('../auth/helper');
const { setSession } = require('./helper');

const router = Router();

router.post('/register', (req, res, next) => {
  let { email, password } = req.body;
  let emailHash = hash(email);
  let passwordHash = hash(password);

  AuthTable.getAccount({ emailHash })
    .then(({ account }) => {
      if (!account) {
        //Promise.all([
          return AuthTable.storeAccount({ emailHash, passwordHash })
          //TODO fix how to send parameter
          //SettingTable.storeMappedItemsSetting()
        //])
    
      } else {
        let error = new Error('This user already exists.');
        error.statusCode = 409;
        throw error;
      }
    })
    //TODO fix how to handle response result of promises array resolved
    .then(resp => {
      console.log('resp', resp)
      SettingTable.storeMappedItemsSetting({user_id: resp.userId})
    })
    .then(() => {
      // adding return keyword allows the catch to then be shared across all then calls
      return setSession({ email, res});      
    })
    .then(({ message, cookie }) => {
      res.json({ message, cookie }) //reusing the message returned from setSession
    })
    .catch(error => next(error));
});

// create POST request handler for /login
router.post('/login', (req, res, next) => {
  let { email,  password } = req.body;
  let emailHash = hash(email);

  AuthTable.getAccount({ emailHash })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;
        return setSession({ email, res, sessionId })
      } else {
        let error = new Error('Login was unsuccessful. Check the email and password and try again.');
        error.statusCode = 409;
        throw error;
      }
    })
    .then(({ message, cookie }) => {
      res.json({ message, cookie }) //reusing the message returned from setSession
    })
    .catch(err => next(err));
})

router.post('/logout', (req, res, next) => {
  let { cookie } = req.body;
  const { email } = Session.parse(cookie.cookie);
  let emailHash = hash(email);
  AuthTable.updateSessionId({ sessionId: null, emailHash })
    .then(() => {
      res.clearCookie('sessionStr');
      res.json({ message: 'Successful logout'})
    })
    .catch(err => next(err));
})

router.post('/authenticated', (req, res, next) => {
  let { cookie } = req.body;
  let error;

  if (cookie) {
    const { email, id } = Session.parse(cookie.cookie);
    let emailHash = hash(email);

    AuthTable.getAccount( { emailHash })
      .then(({ account }) => {
        const authenticated = account.sessionId === id;
        if (authenticated) {
          res.json({ authenticated, message: 'user authenticated' })
        } else {
          error = new Error('Invalid session');
          error.statusCode = 400;
          return next(error);
        }

      })
      .catch(err => next(err));
  } else  if (!cookie || !Session.verify()) {
    error = new Error('Invalid session');
    error.statusCode = 400;
    return next(error);
  }
})

router.put('/settings/timezone', (req, res, next) => {
  let { cookieStr, timezone } = req.body;
  let error;

  if (cookieStr) {
    const { email, id } = Session.parse(cookieStr);
    let emailHash = hash(email);

    AuthTable.storeUserTimezone( { timezone, emailHash })
      .then(resp => {
        if (resp) {
          res.json(resp)
        } else {
          error = new Error('Invalid session');
          error.statusCode = 400;
          return next(error);
        }
      })
      .catch(err => next(err));
  } else  if (!cookie || !Session.verify()) {
    error = new Error('Invalid session');
    error.statusCode = 400;
    return next(error);
  }
})

//used to get the user timezone; passing in cookie with request
router.post('/settings/timezone', (req, res, next) => {
  let { cookieStr } = req.body;
  let error;

  if (cookieStr) {
    const { email, id } = Session.parse(cookieStr);
    let emailHash = hash(email);

    AuthTable.getUserTimezone( { emailHash })
      .then((resp) => {
        if (resp.time_zone) {
          res.json(resp)
        } else {
          error = new Error('Invalid session');
          error.statusCode = 400;
          return next(error);
        }
      })
      .catch(err => next(err));
  } else  if (!cookie || !Session.verify()) {
    error = new Error('Invalid session');
    error.statusCode = 400;
    return next(error);
  }
})

module.exports = router;
