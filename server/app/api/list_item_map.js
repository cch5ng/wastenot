const { Router } = require('express');
const { hash } = require('../auth/helper');
const AuthTable = require('../auth/table');
const Session = require('../auth/Session');
const ListItemMapTable = require('../list_item_map/table');

const router = Router();

router.post('/add', (req, res, next) => {
    let { listItemMaps, cookieStr } = req.body;
    let { email, id } = Session.parse(cookieStr);
    let emailHash = hash(email);
  
    AuthTable.isAuthenticated({ sessionId: id, emailHash })
      .then(resp => {
        if (resp) {
          Promise.all(
            listItemMaps.map(listItemMap => {
              return ListItemMapTable.storeListItemMap({ listItemMap, user_id: resp.account.id })
            })
          )
            .then(resp => {
              let names = resp.map(nameObj => {
                  return nameObj.name;
              });
              res.status(201).json({ 
                                    names,
                                    type: 'success',
                                    message: 'Shopping list items were mapped to expiration dates'
                                   });
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

router.post('/', (req, res, next) => {
  let { cookieStr } = req.body;
  let { email, id } = Session.parse(cookieStr);
  let emailHash = hash(email);

  AuthTable.isAuthenticated({ sessionId: id, emailHash })
    .then(resp => {
      if (resp) {
        ListItemMapTable.getMappedListItemsByUserId({ user_id: resp.account.id })
          .then(resp2 => {
            if (resp2 && resp2.rows) {
              res.status(200).json({mapped_list_items: resp2.rows, type: 'success', message: 'User has mapped shopping list to expiration dates.'});
            } else {
              res.status(200).json({mapped_list_items: [], type: 'success', message: 'User has not mapped shopping list to expiration dates.'});
            }
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

module.exports = router;
