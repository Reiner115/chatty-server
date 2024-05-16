const User = require('./User');
const ChatRoom = require('./ChatRoom');
const Message = require('./Message');
const sequelize = require('./sequelize');

//User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
//User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });

// Define the associations
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receivedMessages' });

User.belongsToMany(ChatRoom, { through: 'UserChatRoom' });
ChatRoom.belongsToMany(User, { through: 'UserChatRoom' });
ChatRoom.hasMany(Message, { foreignKey: 'roomId' });

//{ alter: true }
sequelize.sync(   ).then( a=>{
    console.log("sequalize created tables");
});



module.exports={
    User,
    ChatRoom,
    Message
}
