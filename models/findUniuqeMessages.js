// Define your query parameters
const userId1 = 1;
const userId2 = 2;

// Define the Sequelize query to fetch the last 20 messages
Message.findAll({
  where: {
    [Sequelize.Op.or]: [
      {
        senderId: userId1,
        receiverId: userId2,
      },
      {
        senderId: userId2,
        receiverId: userId1,
      },
    ],
  },
  order: [['createdAt', 'DESC']],
  limit: 20,
})
  .then((messages) => {
    console.log(messages);
  })
  .catch((err) => {
    console.error('Error fetching messages:', err);
  });










  const Sequelize = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance
const Message = require('./models/Message'); // Import your Message model

// Define your query parameters
const userId = 1;

// Define the Sequelize query to fetch the last 10 messages
Message.findAll({
  attributes: [
    [Sequelize.literal('CASE WHEN "senderId" = :userId THEN "receiverId" ELSE "senderId" END'), 'otherUserId'],
    [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'maxCreatedAt'],
  ],
  where: {
    [Sequelize.Op.or]: [
      { senderId: userId },
      { receiverId: userId },
    ],
  },
  group: ['otherUserId'],
  order: [[Sequelize.literal('maxCreatedAt'), 'DESC']],
  limit: 10,
  replacements: { userId },
  type: Sequelize.QueryTypes.SELECT,
})
  .then((conversations) => {
    console.log(conversations);
  })
  .catch((err) => {
    console.error('Error fetching conversations:', err);
  });
