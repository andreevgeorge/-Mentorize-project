require('dotenv').config();

const dbUrl = process.env.DB_URL_PROD;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = { dbUrl, options };

