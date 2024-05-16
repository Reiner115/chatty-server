const { Message } = require("../models");
const { Op } = require("sequelize");
module.exports = async function getChats( user ,  otherUser, callback) {
    let messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                senderId: user.id,
              },
              {
                receiverId: otherUser.id,
              },
            ],
          },
          {
            [Op.and]: [
              {
                senderId: otherUser.id,
              },
              {
                receiverId: user.id,
              },
            ],
          },
        ],
      },
      order: [["createdAt", "ASC"]],
    });
    callback(messages);
  }