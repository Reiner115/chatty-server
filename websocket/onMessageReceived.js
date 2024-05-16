const { Message } = require("../models");
const msgStauts = require("../util/messageStatus");
module.exports = async function onMessage( userSockets,  user , msg, callback) {
    const msgObject = {
      uuid: msg.uuid,
      messageText: msg.messageText,
      receiverId: msg.receiverId,
      senderId: user.id,
      createdAt: Date.now(),
      status : msgStauts.SENT
    };

    let insertedMessage = await Message.create(msgObject);
    if (userSockets[msg.receiverId] != undefined) {
      userSockets[msg.receiverId].emit("message", insertedMessage);
    }
    console.log(insertedMessage);
    callback(insertedMessage);
  }