
const router = require("express").Router();
const {User} = require("../models");
router.post( "/", async function (req , res , next){
    const username = req.body.username;
    const password = req.body.password;
    console.log(username,password);
    const user = await User.create({ username,password });
    user.password = undefined;
    res.status(200).json(user).send();
  } );

  module.exports = router;
