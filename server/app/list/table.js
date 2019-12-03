const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');
const ListItemTable = require('../list_item/table');

class ListTable {

	static storeList({ list }) {
		const { name, type, listItems } = list;
		let list_guid = uuidv4();
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO list (name, type, guid) VALUES ($1, $2, $3) RETURNING guid`,
				[name, type, list_guid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						const listId = response.rows[0].id;

						Promise.all(
							listItems.map(({ name }) => {
								let list_item_guid = uuidv4();
								return ListItemTable.storeListItem({ name, list_guid, list_item_guid })
							})
						)
							.then(() => resolve({ list_guid }))
							.catch(err => reject(err))
					}
				}
			)
		})
	}

	static getListsByType({ listType, emailHash }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT list.name, list.guid FROM list, wastenot_user WHERE list.type = $1 AND "emailHash" = $2 AND wastenot_user.id = list.owner_id`,
				[listType, emailHash],
				(error, response) => {
					if (error) return reject(error);
					let message = '';
					let key = `${listType}Lists`;
					if (response.rows.length === 0) {
						message = 'No lists were found.'
					}
					resolve({[key]: response.rows, message});
				}
			)
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

	static deleteList(guid) {
		return new Promise((resolve, reject) => {
			pool.query(
				`DELETE from list WHERE guid = $1 RETURNING guid`,
				[guid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length)
					resolve({list_guid: response.rows[0].guid});
				}
			)
		})
	}

	static deleteListAndListItems(guid) {
		return Promise.all([
			ListTable.deleteList(guid),
			ListItemTable.deleteListItemsByListGuid(guid)
		])
	}

}

module.exports = ListTable;
