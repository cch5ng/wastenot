require('dotenv').config()
const express = require('express');
const session = require("express-session");
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const listRouter = require('./api/list');
const authRouter = require('./api/auth');
const settingRouter = require('./api/setting');
const listItemMapRouter = require('./api/list_item_map');

// if (process.env.NODE_ENV !== 'production') {
// 	const result = dotenv.config()

// 	if (result.error) {
//   	throw result.error
// 	}
// }



const app = express();
let allowed;

app.use(cors());
app.use(function(req, res, next) {
  allowed = process.env.NODE_ENV === 'production' ? process.env.CLIENT_ROOT_PROD : process.env.CLIENT_ROOT;

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Cookie");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  next();
});

//app.use(cors({ origin: allowed, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: process.env.EXPRESS_SECRET }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

app.use(passport.session());

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
