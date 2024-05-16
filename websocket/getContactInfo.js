const { User } = require("../models");
module.exports = async function getContactInfo( user , data , callback ){
    const contact = await User.findOne({where:{id:data.id}});
    callback(contact);
}