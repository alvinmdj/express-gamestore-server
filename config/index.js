require('dotenv').config();

const path = require('path');

module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  serviceName: process.env.SERVICE_NAME,
  dbUrl: process.env.MONGO_URL,
  sessionSecret: process.env.SESSION_SECRET,
};
