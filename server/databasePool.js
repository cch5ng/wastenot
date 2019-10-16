const { Pool } = require('pg');
let databaseConfiguration = {}
let connectionString;
let pool;

if (process.env.NODE_ENV === 'production') {
	connectionString = process.env.DATABASE_URL;
	pool = new Pool({ connectionString });
} else {
	//databaseConfiguration = require('./secrets/databaseConfiguration');
	pool = new Pool(); //databaseConfiguration
}

module.exports = pool;