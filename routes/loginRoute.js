const router = require("express").Router();
router.post("/", function (req, res) {
  if (req.user) res.status(200).send();
  else res.status(401).json({message:"wrong username or password"}).send();
});

module.exports = router;
