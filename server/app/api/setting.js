const { Router } = require('express');
const SettingTable = require('../setting/table');
const AuthTable = require('../auth/table');
const Session = require('../auth/Session');
const { hash } = require('../auth/helper');
//const { setSession } = require('./helper');

const router = Router();

router.post('/listItemMapping', (req, res, next) => {
    let { cookie } = req.body;
    let { email, id } = Session.parse(cookie);
    let emailHash = hash(email);
  
    AuthTable.isAuthenticated({ sessionId: id, emailHash })
      .then(resp => {
        if (resp) {
          SettingTable.getListItemMapping({ user_id: resp.account.id })
            .then(resp => res.status(200).json(resp))
            .catch(err => next(err));
         } else {
           let error = new Error('User is not logged in.');
           error.statusCode = 401;
           next(error);
         }
       })
       .catch(error => next(error));
  });

//should update a record in setting table
router.put('/listItemMapping', (req, res, next) => { 
    let { cookie } = req.body;
    let { email, id } = Session.parse(cookie);
    let emailHash = hash(email);
  
    AuthTable.isAuthenticated({ sessionId: id, emailHash })
      .then(resp => {
        if (resp) {
          SettingTable.updateListItemMapping({ user_id: resp.account.id })
            .then(resp => res.status(204).json(resp))
            .catch(err => next(err));
         } else {
           let error = new Error('User is not logged in.');
           error.statusCode = 401;
           next(error);
         }
       })
       .catch(error => next(error));
});

module.exports = router;
