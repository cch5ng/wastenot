const { Router } = require('express');
const AuthTable = require('../auth/table');
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
        AuthTable.storeAccount({ emailHash, passwordHash })
      } else {
        let error = new Error('This user already exists.');
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      // adding return keyword allows the catch to then be shared across all then calls
      return setSession({ email, res});
    })
    .then(({ message }) => {
      res.json({ message }) //reusing the message returned from setSession
    })
    .catch(err => next(err));
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
    .then(({ message }) => {
      res.json({ message }) //reusing the message returned from setSession
    })
    .catch(err => next(err));
})

router.get('/logout', (req, res, next) => {
  const { email } = Session.parse(req.cookies.sessionStr);
  let emailHash = hash(email);
  AuthTable.updateSessionId({ sessionId: null, emailHash })
    .then(() => {
      res.clearCookie('sessionStr');
      res.json({ message: 'Successful logout'})
    })
    .catch(err => next(err));

})

module.exports = router;
