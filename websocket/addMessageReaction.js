const { Message } = require("../models");

module.exports = async function (userSockets,  user , data , callback){
    const message = data.message;
    
    const userIdToForwardTheReactionTo = message.senderId === user.id ? message.receiverId : message.senderId;
    //const reactionToUpdate = message.senderId === user.id ? 'senderReaction' : 'receiverReaction';
    console.log(message);

    const fieldToUpdate = message.senderId === user.id ? { senderReaction : message.senderReaction } : { receiverReaction : message.receiverReaction };
    const result = await Message.update(
        fieldToUpdate ,
        {
          where: {
            uuid: message.uuid,
          },
        }
      );
    
   // const result = await Message.create( message , { updateOnDuplicate : [ reactionToUpdate ] } );
    
    if( userSockets[ userIdToForwardTheReactionTo ] !== undefined ){
        userSockets[ userIdToForwardTheReactionTo ].emit("messageReaction", {
            error : false,
            message : message
        } );
    }
    

    console.log(result);
    console.log(result);
    
}   