const { Router } = require('express');
const AuthTable = require('../auth/table');
const { hash } = require('../auth/helper');
const Session = require('../auth/Session');

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
      const session = new Session({ email });
      const sessionStr = session.toString();

      res.cookie('sessionStr', sessionStr, {
        expire: Date.now() + 3600000,
        httpOnly: true,
        //secure: true
      })

      res.json({ message: 'success!'})
    })
    .catch(err => next(err));
});

module.exports = router;
