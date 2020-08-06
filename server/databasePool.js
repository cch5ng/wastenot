const { Pool } = require('pg');
require('dotenv').config()

const connectionString = `postgresql://${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
 connectionString,
})
//const pool = new Pool();

//if (process.env.NODE_ENV === 'production') {
//	connectionString = process.env.DATABASE_URL;
//	pool = new Pool({ connectionString });
//} else {
	//databaseConfiguration = require('./secrets/databaseConfiguration');
//	pool = new Pool(); //databaseConfiguration
//}

module.exports = pool;