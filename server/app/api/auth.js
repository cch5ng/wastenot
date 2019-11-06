const { Router } = require('express');
const AuthTable = require('../auth/table');

const router = Router();

router.post('/register', (req, res, next) => {
  AuthTable.storeAccount(req.body)
    .then(resp => res.json(resp))
    .catch(err => next(err));
    //console.error('error', err));
});

module.exports = router;