const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const listRouter = require('./api/list');
const authRouter = require('./api/auth');
const settingRouter = require('./api/setting');
const listItemMapRouter = require('./api/list_item_map');

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

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Cookie");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  next();
});

//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/list', listRouter);
app.use('/api/auth', authRouter);
app.use('/api/setting', settingRouter);
app.use('/api/listItemMap', listItemMapRouter);
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
