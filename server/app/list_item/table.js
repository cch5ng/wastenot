const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');

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
	static getListItemsByListGuid(listGuid) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT guid, name, sort_order, list_guid from list_item WHERE list_guid = $1`,
				[listGuid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve(response.rows);
					}
				}
			)
		})
	}

}

module.exports = ListItemTable;
