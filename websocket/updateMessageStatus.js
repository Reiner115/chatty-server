const { Message } = require("../models");
module.exports = async function updateMessageStatus( userSockets , user, msg, callback) {
  let result = await Message.update(
    {
      status: msg.status,
    },
    {
      where: {
        uuid: msg.uuid,
      },
    }
  );

    console.log(result);
    if (userSockets[msg.senderId] != undefined) {
        userSockets[msg.senderId].emit("updateMessageStauts", msg );
    }
    

};
