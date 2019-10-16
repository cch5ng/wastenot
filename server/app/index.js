const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const listRouter = require('./api/list');

if (process.env.NODE_ENV !== 'production') {
	const result = dotenv.config()
 
	if (result.error) {
  	throw result.error
	}
}

const app = express();

app.use(function(req, res, next) {
  let allowed;
  allowed = process.env.NODE_ENV === 'production' ? process.env.CLIENT_ROOT_PROD : process.env.CLIENT_ROOT;

  res.header("Access-Control-Allow-Origin", "*"); // "*"
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use('/api/list', listRouter);
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		type: 'error',
		message: err.message
	});
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../dist')));
  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../dist/index.html'));
  });
}

module.exports = app;