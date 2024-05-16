// models/Message.js

const Sequelize = require('sequelize')
const sequelize = require('./sequelize'); // Import the Sequelize instance
const User = require('./User');
const ChatRoom = require('./ChatRoom');

const Message = sequelize.define('message', {
  messageText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  type:{
    type : Sequelize.INTEGER,
    allowNull:false,
    defaultValue:1
  },
  status:{
    type : Sequelize.INTEGER,
    allowNull:false,
    defaultValue:2
  },
  senderReaction:{
    type : Sequelize.INTEGER,
    allowNull:true,
  },
  receiverReaction:{
    type : Sequelize.INTEGER,
    allowNull:true,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});



module.exports = Message;
