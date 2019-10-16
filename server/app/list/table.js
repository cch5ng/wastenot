const pool = require('../../databasePool');

class ListTable {

	// static storeList({ list }) {
	// 	return new Promise((resolve, reject) => {
	// 		pool.query(
	// 			`SELECT * from `,
	// 			[list],
	// 			(error, response) => {
	// 				if (error) return reject(error);
	// 				resolve(response.rows);
	// 			}
	// 		)
	// 	})
	// }

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
	static getListDetailById({ listId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT * from list WHERE id = $1`,
				[listId],
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
