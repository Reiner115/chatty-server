// models/ChatRoom.js

const Sequelize = require('sequelize');
const sequelize = require('./sequelize'); // Import the Sequelize instance

const ChatRoom = sequelize.define('ChatRoom', {
  roomName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = ChatRoom;
