const { Router } = require('express');
const AuthTable = require('../auth/table');
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
        error.statusode = 409;
        throw error;
      }
    })
    .then(() => {
      setSession({ email, res});
      res.json({ message: 'success!'})
    })
    .catch(err => next(err));
});

module.exports = router;
