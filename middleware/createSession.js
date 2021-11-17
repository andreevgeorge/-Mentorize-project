require('dotenv').config();

const session = require('express-session');
const FileStore = require('session-file-store')(session); 

module.exports = session({
  name: 'sid',
  store: new FileStore({}),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
})