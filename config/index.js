require('dotenv').config();

module.exports = {
  serviceName: process.env.SERVICE_NAME,
  dbUrl: process.env.MONGO_URL,
  sessionSecret: process.env.SESSION_SECRET,
};
