const { Message } = require("../models");

module.exports = async function (userSockets,  user , msg, callback){
    const messages = msg.messages;
    console.log(messages);
    const result = await Message.bulkCreate( messages , { updateOnDuplicate : ['status'] } );
    if( userSockets[ result[0].senderId ] !== undefined ){
        userSockets[messages[0].senderId].emit("updateBulkMessages", {
            error : false,
            messages : result
        } );
    }
    callback({error:false})
    
}   