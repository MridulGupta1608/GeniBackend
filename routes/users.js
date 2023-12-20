const express = require("express");
const router = express.Router();
const User = require("../Models/user.model");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send({
      message: "Some error",
      success: false,
    });
  }
});

module.exports = router;
