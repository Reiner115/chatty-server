var router = require("express").Router();
router.use("/", function (req, res, next) {
    const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    let user = req.user;
    user.password = undefined;
    res.status(200).json(user).send()
  } else 
    res.status(401).json().send()
  
});

module.exports = router;