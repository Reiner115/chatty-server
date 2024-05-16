const { User } = require('../../models')
const LocalStrategy = require("passport-local").Strategy;

module.exports = function passportLocalStrategy(){
    return   new LocalStrategy( async (username, password, done) => {
        const user = await User.findOne({where:{username:username}});
          if( user ){
            return done(null, user);
          }else{
            return done(null, false);
          }
          console.log(result);
        });
}