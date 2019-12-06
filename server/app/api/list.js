const { Router } = require('express');
//const passport = require('passport');
const ListTable = require('../list/table');
const ListItemTable = require('../list_item/table');
const { hash } = require('../auth/helper');
const AuthTable = require('../auth/table');
const Session = require('../auth/Session');

const router = Router();

router.post('/add', (req, res, next) => {
  let cookieStr = req.body.cookieStr;
  let {name, type, listItems} = req.body;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.storeList({name, type, listItems, owner_id: resp.account.id})
          .then(resp => res.json(resp))
          .catch(err => next(err));
       } else {
         let error = new Error('User is not logged in.');
         error.statusCode = 401;
         next(error);
       }
     })
     .catch(error => next(error));
    //console.error('error', err));
});

router.post('/shoppingLists', (req, res, next) => {
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.getListsByType({ listType: 'shopping', emailHash })
          .then(lists => res.json(lists))
          .catch(err => next(err));
      } else {
        let error = new Error('User is not logged in.');
        error.statusCode = 401;
        next(error);
      }
    })
    .catch(error => next(error));
});

router.post('/templateLists', (req, res, next) => {
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.getListsByType({ listType: 'template', owner_id: resp.account.id })
          .then(lists => res.json(lists))
          .catch(err => next(err));
      } else {
        let error = new Error('User is not logged in.');
        error.statusCode = 401;
        next(error);
      }
    })
    .catch(error => next(error));
});

//REFACTOR get list items and also the list name by guid
router.post('/listDetail/:listGuid', (req, res, next) => {
  const { listGuid } = req.params;
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListItemTable.getListItemsByListGuid(listGuid)
          .then(listItems => res.json(listItems))
          .catch(err => next(err));
      } else {
        let error = new Error('User is not logged in.');
        error.statusCode = 401;
        next(error);
      }
    })
    .catch(error => next(error));
});

router.put('/listDetail/:listGuid', (req, res, next) => {
  const { listGuid } = req.params;
  const { name, type, listItems } = req.body;
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        if ((name || type) && listItems.length) {
          ListTable.updateListAndListItems({name, type, guid: listGuid, listItems})
            .then(values => res.json(values))
            .catch(err => next(err));
            //console.error('error', err));   
        } else if (name || type) {
          ListTable.updateList({name, type, guid: listGuid})
            .then(list_guid => res.json(list_guid))
            .catch(err => next(err));
            //console.error('error', err));
        } else if (listItems.length) {
          ListItemTable.updateListItems(listItems)
            .then(list_item_guids => {
              //let list_item_guids_ar = list_item_guids.map(obj => obj.guid);
              res.json(list_item_guids);
            })
            .catch(err => next(err));
        }
      } else {
        let error = new Error('User is not logged in.');
        error.statusCode = 401;
        next(error);
      }
    })
    .catch(error => next(error));
});

router.delete('/listDetail/:listGuid', (req, res, next) => {
  const { listGuid } = req.params;
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.deleteListAndListItems(listGuid)
          .then(resp => res.json(resp))
          .catch(err => next(err))
      } else {
        let error = new Error('User is not logged in.');
        error.statusCode = 401;
        next(error);
      }
    })
    .catch(error => next(error));
})

router.delete('/listItemDetail/:listItemGuid', (req, res, next) => {
  const {listItemGuid} = req.params;
  ListItemTable.deleteListItemByItemGuid(listItemGuid)
    .then(list_item_guid => res.json(list_item_guid))
    .catch(err => next(err))
})


// router.post('/random',
//  passport.authenticate('jwt', { session: false }),
//  (req, res, next) => {
//  QuestionTable.getRandomQuestionsByCategoryCounts(req.body)
//    .then(testLists => res.json(testLists))
//    .catch(err => console.error('error', err))
// })

module.exports = router;