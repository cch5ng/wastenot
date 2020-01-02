const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');
const ListItemTable = require('../list_item/table');

class ListTable {

  static storeList({ name, type, listItems, owner_id }) {
    let list_guid = uuidv4();
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO list (name, type, guid, owner_id) VALUES ($1, $2, $3, $4) RETURNING guid`,
        [name, type, list_guid, owner_id],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            const listId = response.rows[0].id;

            Promise.all(
              listItems.map(({ name, sortOrder }) => {
                let list_item_guid = uuidv4();
                return ListItemTable.storeListItem({ name, list_guid, list_item_guid, sortOrder })
              })
            )
              .then(() => {
                resolve(
                  { message: `templateList with guid, ${list_guid}, was added`,
                    listTemplate: {[list_guid]: { name, type, listItems } },
                    type: 'success'
                  }
                )
              })
              .catch(err => reject(err))
          }
        }
      )
    })
  }

  static storeShoppingList({ name, type, listItems, owner_id }) {
    let list_guid = uuidv4();
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO list (name, type, guid, owner_id) VALUES ($1, $2, $3, $4) RETURNING guid`,
        [name, type, list_guid, owner_id],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            const listId = response.rows[0].id;

            Promise.all(
              listItems.map(({ name, sortOrder, checked }) => {
                let list_item_guid = uuidv4();
                return ListItemTable.storeShoppingListItem({ name, list_guid, list_item_guid, sortOrder, checked })
              })
            )
              .then(() => {
                resolve(
                  { message: `templateList with guid, ${list_guid}, was added`,
                    shoppingList: {[list_guid]: { name, type, listItems } },
                    type: 'success'
                  }
                )
              })
              .catch(err => reject(err))
          }
        }
      )
    })
  }

  static getListsByType({ listType, owner_id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT name, guid FROM list WHERE type = $1 AND "owner_id" = $2`,
        [listType, owner_id],
        (error, response) => {
          if (error) return reject(error);
          let message = '';
          let key = listType === 'template' ? 'listTemplates' : 'shoppingLists';
          if (response.rows.length === 0) {
            message = 'No lists were found.'
          }
          resolve({[key]: response.rows, message});
        }
      )
    })
  }

  // static getShoppingLists({ owner_id }) {
  //   return new Promise((resolve, reject) => {
  //     let listType = 'shopping';
  //     pool.query(
  //       `SELECT name, guid FROM list WHERE type = $1 AND "owner_id" = $2`,
  //       [listType, owner_id],
  //       (error, response) => {
  //         if (error) return reject(error);
  //         let message = '';
  //         let key = listType === 'template' ? 'listTemplates' : 'shoppingLists';
  //         if (response.rows.length === 0) {
  //           message = 'No lists were found.'
  //         }
  //         resolve({[key]: response.rows, message});
  //       }
  //     )
  //   })
  // }


  static getListByGuid({ guid }) {
    return new Promise((resolve, reject) => {
      if (guid) {
        pool.query(
          `SELECT name FROM list WHERE guid = $1`,
          [guid],
          (error, response) => {
            if (error) return reject(error);
            let message = '';
            if (response.rows.length === 0) {
              message = 'No list was found.'
            }
            resolve({name: response.rows[0].name, guid});
          }
        )
      } else {
        let err = new Error;
        err.statusCode = 400;
        err.message = 'Missing list guid';
        return reject(err)
      }
    })
  }


  static updateList({ name, type, guid }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE list SET name = $1, type = $2 WHERE guid = $3 RETURNING guid`,
        [name, type, guid],
        (error, response) => {
          if (error) return reject(error);
          resolve({list_guid: guid});
        }
      )
    })
  }

  static updateListAndListItems({name, type, guid, listItems}) {
    return Promise.all([
      ListTable.updateList({name, type, guid}),
      ListItemTable.updateListItems(listItems)
    ])
  }

//TODO
  static updateShoppingListAndListItems({name, guid, listItems}) {
    return Promise.all([
      ListTable.updateList({name, type: 'shopping', guid}),
      ListItemTable.updateShoppingListItems(listItems)
    ])
  }

  static deleteList(guid) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE from list WHERE guid = $1 RETURNING guid`,
        [guid],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length) {
            resolve({
              guid: response.rows[0].guid,
              message: `List with guid, ${response.rows[0].guid} was removed.`,
              type: 'success'
            });
          }
        }
      )
    })
  }

  static deleteListAndListItems(guid) {
    return ListItemTable.deleteListItemByListGuid(guid)
      .then(resp => {
        if (resp) {
          return ListTable.deleteList(guid);
        }
      })
      .catch(err => console.error('error', err))
    //])
  }

}

module.exports = ListTable;
