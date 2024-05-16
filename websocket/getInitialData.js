const Sequelize = require("sequelize");
const seq = require("../models/sequelize");
const { User } = require("../models");
module.exports = async function getContactsByName(user, contactStart, callback) {
  // const  contactStart = req.query.contactStart+"%";

  try{

  const result = await getContacts(user);
  const contacts = prepareUsers(result);
  const reversedContacts = contacts.reverse();

  const finalResult = {
    user : user,
    contacts : reversedContacts
  }
  callback(finalResult);
  
  }catch( e ){
    console.error(e)
  }

}

async function getContacts( user ){
  return seq
  .query(
    `
 SELECT u.id as userId , u.username, m.messageText , m.createdAt , m.senderId , m.receiverId , m.uuid , m.type
FROM Users u
JOIN (
  SELECT
      CASE
          WHEN senderId = ${user.id} THEN receiverId
          ELSE senderId
      END AS user_id,
      MAX(createdAt) AS max_createdAt
  FROM messages
  WHERE senderId = ${user.id} OR receiverId = ${user.id}
  GROUP BY user_id
) latest_messages
ON u.id = latest_messages.user_id
JOIN messages m
ON (
  (m.senderId = ${user.id} AND m.receiverId = latest_messages.user_id) OR
  (m.senderId = latest_messages.user_id AND m.receiverId = ${user.id})
) AND m.createdAt = latest_messages.max_createdAt;
`,
    { type: Sequelize.QueryTypes.SELECT }
  );
}

function prepareUsers(result) {
  let contacts = [];
  for (let i = 0; i < result.length; i++) {
    let messages = [];
    const message = {
      messageText: result[i].messageText,
      createdAt: result[i].createdAt,
      senderId: result[i].senderId,
      receiverId: result[i].receiverId,
      type: result[i].type,
      uuid: result[i].uuid,
    };
    messages.push(message);
    let contact = {
      id: result[i].userId,
      username: result[i].username,
      messages: messages,
    };
    contacts.push(contact);
  }
  console.log(contacts);
  return contacts;
}
