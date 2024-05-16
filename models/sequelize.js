
const Sequelize = require('sequelize');



const sequelize = new Sequelize(process.env.CHAT_DB_NAME , process.env.CHAT_DB_USER, 
  process.env.CHAT_DB_PASSWORD ,
   {
  host: process.env.CHAT_DB_HOST,       // Your MySQL host (e.g., 'localhost')
  dialect: process.env.CHAT_DB_DIALECT ,        // The dialect for MySQL
  port: process.env.CHAT_DB_PORT ,              // MySQL port (default is 3306)
  // Additional options here...
});

module.exports = sequelize;
