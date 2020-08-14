const { Router } = require('express');
const ListTable = require('../list/table');
const ListItemTable = require('../list_item/table');
const { hash } = require('../auth/helper');
const AuthTable = require('../auth/table');
const Session = require('../auth/Session');

const router = Router();

//probably want to refactor this to be more clear like /templateLists/add
router.post('/templateLists/add', (req, res, next) => {
  let {name, type, listItems, cookieStr} = req.body;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.storeList({name, type, listItems, owner_id: resp.account.id})
          .then(resp => res.status(201).json(resp))
          .catch(err => next(err));
       } else {
         let error = new Error('User is not logged in.');
         error.statusCode = 401;
         next(error);
       }
     })
     .catch(error => next(error));
});

router.post('/shoppingLists/add', (req, res, next) => {
  let {name, type, listItems, cookieStr} = req.body;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.storeShoppingList({name, type, listItems, owner_id: resp.account.id})
          .then(resp => res.status(201).json(resp))
          .catch(err => next(err));
       } else {
         let error = new Error('User is not logged in.');
         error.statusCode = 401;
         next(error);
       }
     })
     .catch(error => next(error));
});


//GET all shopping lists
router.post('/shoppingLists', (req, res, next) => {
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.getListsByType({ listType: 'shopping', owner_id: resp.account.id  })
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

//GET all template lists
router.post('/templateLists', (req, res, next) => {
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListTable.getListsByType({ listType: 'template', owner_id: resp.account.id })
          .then(lists => res.status(200).json(lists))
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
//TEST but should apply to both template list and shopping list
router.post('/listDetail/:listGuid', (req, res, next) => {
  const { listGuid } = req.params;
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        Promise.all([
          ListItemTable.getListItemsByListGuid({ listGuid }),
          ListTable.getListByGuid({guid: listGuid})
        ])
          .then(response => {
            let listTemplate = {};
            response.forEach(obj => {
              listTemplate = {...listTemplate, ...obj}
            })
            listTemplate.guid = listGuid;
            res.status(200).json({ listTemplate, message: 'List was successfully retrieved', type: 'success' });
          })
          .catch(err => next(err));
      } else {
        let error = new Error('User is not logged in.');
        error.statusCode = 401;
        next(error);
      }
    })
    .catch(error => next(error));
});

//TEST should apply to template list
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
            .then(values => {
              if (values.length) {
                res.json({ message: `list with guid, ${listGuid} was updated`,
                            type: 'success'
                })
              }
            })
            .catch(err => next(err));
        } else if (name || type) {
          ListTable.updateList({name, type, guid: listGuid})
            .then(list_guid => {
              if (list_guid) {
                res.json({ message: `list with guid, ${listGuid} was updated`,
                            type: 'success'
              })
              }
            })
            .catch(err => next(err));
        } else if (listItems.length) {
          ListItemTable.updateListItems(listItems)
            .then(list_item_guids => {
              if (list_item_guids.length) {
                res.json({ message: `list with guid, ${listGuid} was updated`,
                            type: 'success'
                })
              }
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

//TEST should apply to shopping list
router.put('/shoppingListDetail/:listGuid', (req, res, next) => {
  const { listGuid } = req.params;
  const { name, type, listItems } = req.body;
  let cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);


  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        if ((name || type) && listItems.length) {
          ListTable.updateShoppingListAndListItems({name, guid: listGuid, listItems})
            .then(values => {
              if (values.length) {
                res.json({ message: `list with guid, ${listGuid} was updated`,
                            type: 'success'
                })
              }
            })
            .catch(err => next(err));
        } else if (name || type) {
          ListTable.updateList({name, type, guid: listGuid})
            .then(list_guid => {
              if (list_guid) {
                res.json({ message: `list with guid, ${listGuid} was updated`,
                            type: 'success'
              })
              }
            })
            .catch(err => next(err));
        } else if (listItems.length) {
          ListItemTable.updateShoppingListItems(listItems)
            .then(list_item_guids => {
              if (list_item_guids.length) {
                res.json({ message: `list with guid, ${listGuid} was updated`,
                            type: 'success'
                })
              }
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

//handle sw request to update sent_notification on list_item
router.put('/sentNotification/:list_item_id', (req, res, next) => {
  const { list_item_id } = req.params;
  //let email = req.body;
  //let emailHash = hash(email);

  //FU how to handle auth since cannot access localstorage from sw
  //AuthTable.isAuthenticated({ emailHash })
    //.then(resp => {
      //if (resp) {
          ListItemTable.updateNotificationSent({id: list_item_id})
            .then(values => {
              if (values.length) {
                res.json({ message: `list_item with id, ${id} was updated`,
                            type: 'success'
                })
              }
            })
            .catch(err => next(err));
      //} else {
      //  let error = new Error('User is not logged in.');
      //  error.statusCode = 401;
      //  next(error);
      //}
    //})
    //.catch(error => next(error));
});

//TEST should apply to both template list and shopping list
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

//TEST should apply to both template list and shopping list
router.delete('/listItemDetail/:listItemGuid', (req, res, next) => {
  const {listItemGuid} = req.params;
  ListItemTable.deleteListItemByItemGuid(listItemGuid)
    .then(list_item_guid => res.json(list_item_guid))
    .catch(err => next(err))
})

//section for notification related changes
router.post('/notifications', (req, res, next) => {
  const cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListItemTable.getRecentNotificationsByEmail(emailHash)
          .then(resp => {
            if (resp.rows.length) {
              res.status(200)
                .json({notifications: resp.rows, message: 'Notifications were successfully retrieved.', type: 'success'})
            } else {
              res.status(200)
                .json({notifications: [], message: 'No notifications were found.', type: 'success'})
            }
          })
          .catch(err => next(err))
      } else {
        let error = new Error('User is not logged in.');
        error.statusCode = 401;
        next(error);
      }
    })
    .catch(error => next(error));
})

router.put('/notifications/postpone/:list_item_guid', (req, res, next) => {
  const {list_item_guid} = req.params;
  const cookieStr = req.body.cookieStr;
  const { timestamp } = req.body;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListItemTable.putPostponeNotificationByListItemId(timestamp, list_item_guid)
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

router.put('/notifications/cancel/:list_item_guid', (req, res, next) => {
  const {list_item_guid} = req.params;
  const cookieStr = req.body.cookieStr;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListItemTable.putCancelNotificationByListItemId(list_item_guid)
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

module.exports = router;
