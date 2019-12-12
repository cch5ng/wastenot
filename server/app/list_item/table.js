const uuidv4 = require('uuid/v4');
const pool = require('../../databasePool');
const { section_name_to_id } = require('../utils/constants');

class ListItemTable {

	//REFACTOR, maybe should move to ListItemTable class
	static storeListItem({ name, list_guid, list_item_guid }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO list_item (name, list_guid, guid) VALUES ($1, $2, $3) RETURNING list_guid`,
				[name, list_guid, list_item_guid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve({ list_guid });
					}
				}
			)
		})
	}

	//probably want to get everything like name plus the list items
	static getListItemsByListGuid({ listGuid }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT list_item.guid, list_item.name, list_item.sort_order, list_item.list_guid from list_item WHERE list_guid = $1`,
				[listGuid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve({listItems: response.rows});
					}
				}
			)
		})
	}

	static updateListItem({ name, guid, sort_order }) {
		//const { guid, name, sort_order } = listItem;
		return new Promise((resolve, reject) => {
			pool.query(
				`UPDATE list_item SET name = $2, sort_order = $3 WHERE guid = $1 RETURNING guid`,
				[guid, name, sort_order],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve({list_item_guid: response.rows[0].guid});
					}
				}
			)
		})
	}

	static updateListItems(listItems) {
		return Promise.all(
			listItems.map(listItem => {
				const { name, guid, sort_order } = listItem;
				return ListItemTable.updateListItem({ name, guid, sort_order })
			})
		)
	}

	static deleteListItemByItemGuid(itemGuid) {
		return new Promise((resolve, reject) => {
			pool.query(
				`DELETE from list_item WHERE guid = $1 RETURNING guid`,
				[itemGuid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve({list_item_guid: response.rows[0].guid})
					}
				}
			)
		})
	}

	// static deleteListItemsByItemGuid(itemGuids) {
	// 	return Promise.all(
	// 		itemGuids.map(guid => ListItemTable.deleteListItemByItemGuid(guid))
	// 	)
	// }

	static deleteListItemByListGuid(guid) {
		return new Promise((resolve, reject) => {
			pool.query(
				`DELETE from list_item WHERE list_guid = $1 RETURNING guid`,
				[guid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve({list_item_guid: response.rows[0].guid});
					}
				}
			)
		})
	}

}

module.exports = ListItemTable;
