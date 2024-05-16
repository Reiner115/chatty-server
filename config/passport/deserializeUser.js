const {User} = require("../../models");
module.exports = function(id, cb)  {
    console.log(`deserializeUser ${id}`);
    User.findOne({where:{id:id}}).then( user =>{
      if( user ) cb(null, user );
      else cb( null,null);
    })
}