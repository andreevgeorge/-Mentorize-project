const mongoose = require('mongoose');
const Mentor = require('./models/mentor');
const Tag = require('./models/tag');
// const { User, Tag } = require("./models");
const { dbUrl, options } = require('./config');

(async () => {
  try {
    console.log('Conecting...');
    await mongoose.connect(dbUrl, options);
    console.log('Mongoose connected to database successfully');

    console.log('Seeding...');
    // ]);


    console.error('Error:', e.message);
  } finally {
    await mongoose.connection.close();
    console.log('DB closed');
  }
})();
