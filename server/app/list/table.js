const pool = require('../../databasePool');
const uuidv4 = require('uuid/v4');

class ListTable {

	static storeList({ list }) {
		const { name, type, listItems } = list;
		let guid = uuidv4();
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO list (name, type, guid) VALUES ($1, $2, $3) RETURNING guid`,
				[name, type, guid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						const listId = response.rows[0].id;

						Promise.all(
							listItems.map(({ name }) => {
								let guid = uuidv4();
								return ListTable.storeListItem({ name, listId, guid })
							})
						)
							.then(() => resolve({ list_guid: response.rows[0].guid }))
							.catch(err => reject(err))
					}
				}
			)
		})
	}

	//REFACTOR, maybe should move to ListItemTable class
	static storeListItem({ name, listId, guid }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO list_item (name, list_id, guid) VALUES ($1, $2, $3) RETURNING guid`,
				[name, listId, guid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve();
					}
				}
			)
		})
	}

	static getListsByType({ listType }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT * from list WHERE type = $1`,
				[listType],
				(error, response) => {
					if (error) return reject(error);
					console.log('response.rows', response.rows);
					resolve(response.rows);
				}
			)
		})
	}

	//probably want to get everything like name plus the list items
	static getListDetailById({ listGuid }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT * from list WHERE id = $1`,
				[listGuid],
				(error, response) => {
					if (error) return reject(error);
					if (response.rows.length) {
						resolve(response.rows[0]);
					}
				}
			)
		})
	}


}

module.exports = ListTable;
