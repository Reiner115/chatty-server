const { Message } = require("../models");
const { User } = require("../models");
const Sequelize = require("sequelize");
const seq = require("../models/sequelize");
const { Op } = require("sequelize");
const getInitialData = require("./getInitialData");
const onMessageReceived = require("./onMessageReceived");
const getChats = require("./getChats");
const getContactInfo = require("./getContactInfo");
const updateMessageStatus = require("./updateMessageStatus");
const updateBulkMessages = require("./updateBulkOfMessages");
const  addMessageReaction = require("./addMessageReaction"); 
const userSockets = {};

module.exports = function (socket) {
  console.log(`new connection ${socket.id}`);
  const user = socket.request.user;
  userSockets[user.id] = socket;

  socket.on("message", (data , callback)=> onMessageReceived( userSockets , user , data, callback ) );
  socket.on("dissconnect", onDissconnect);
  socket.on("getInitialData", (data , callback)=> getInitialData(user , data , callback) );
  socket.on("getChats", (data , callback) => getChats(user , data , callback)  );
  socket.on("getContactInfo" , (data , callback)=>getContactInfo(user , data, callback));
  socket.on("updateMessageStauts" , (data ,callback)=>updateMessageStatus( userSockets , user , data , callback) );
  socket.on("updateBulkMessages" , (data , callback) =>updateBulkMessages(userSockets , user , data , callback));
  socket.on("messageReaction" , (data , callback) =>addMessageReaction(userSockets , user , data , callback));

  const session = socket.request.session;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  session.socketId = socket.id;
  session.save();


  function onDissconnect(){
    console.log("disconnected");
  }
 
};
