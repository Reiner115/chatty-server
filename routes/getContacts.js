const { User } = require("../models");
const router = require("express").Router();
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  const contactStart = req.query.contactStart + "%";
  try {
    let users = await User.findAll({
      where: {
        username: {
          [Op.like]: contactStart,
        },
      },
    });
    console.log(users);
    res.status(200).json(users).send();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;