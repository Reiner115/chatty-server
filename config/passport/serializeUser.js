module.exports = function(user, cb){
    console.log(`serializeUser ${user.id}`);
    cb(null, user.id);
}