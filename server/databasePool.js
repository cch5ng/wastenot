const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
	user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

//if (process.env.NODE_ENV === 'production') {
//	connectionString = process.env.DATABASE_URL;
//	pool = new Pool({ connectionString });
//} else {
	//databaseConfiguration = require('./secrets/databaseConfiguration');
//	pool = new Pool(); //databaseConfiguration
//}

module.exports = {
  query: (text, params, callback) => {
		const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      if (res && res.rowCount) {
        console.log('executed query', { text, duration, rows: res.rowCount })
      } else {
        console.log('incomplete query', { text})
      }
      callback(err, res)
    })
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args
        return query.apply(client, args)
      }
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000)
      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)
        // clear our timeout
        clearTimeout(timeout)
        // set the query method back to its old un-monkey-patched version
        client.query = query
      }
      callback(err, client, release)
    })
  }
}