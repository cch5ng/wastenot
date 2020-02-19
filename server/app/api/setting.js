const { Router } = require('express');
const SettingTable = require('../setting/table');

//const Session = require('../auth/Session');
//const { hash } = require('../auth/helper');
//const { setSession } = require('./helper');

const router = Router();

router.post('/listItemMapping', (req, res, next) => {
    let {name, type, listItems, cookieStr} = req.body;
    let { email, id } = Session.parse(cookieStr);
    let emailHash = hash(email);
  
    AuthTable.isAuthenticated({ sessionId: id, emailHash })
      .then(resp => {
        if (resp) {
          SettingTable.getListItemMapping({ user_id: resp.account.id })
            .then(resp => res.json(resp))
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
router.put('/', (req, res, next) => { 

});

module.exports = router;
