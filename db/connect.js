const mongoose = require('mongoose');
const { dbUrl, options } = require('./config');

function dbConnect() {
  mongoose
    .connect(dbUrl, options)
    .then(() => {
      console.log('Mongoose connected to database');
    })
    .catch((err) => {
      console.log('Database connection error', err.message);
    });
}

module.exports = dbConnect;
