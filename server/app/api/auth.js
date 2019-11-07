const { Router } = require('express');
const AuthTable = require('../auth/table');
const { hash } = require('../auth/helper');

const router = Router();

router.post('/register', (req, res, next) => {
  let { email, password } = req.body;
  let emailHash = hash(email);
  let passwordHash = hash(password);

  AuthTable.storeAccount({ emailHash, passwordHash })
    .then(resp => res.json(resp))
    .catch(err => next(err));
    //console.error('error', err));
});

module.exports = router;