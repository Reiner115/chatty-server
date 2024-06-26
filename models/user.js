// models/User.js

const Sequelize = require('sequelize');
const sequelize = require('./sequelize'); // Import the Sequelize instance

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photo : {
    type : Sequelize.STRING,
    allowNull:true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = User;
