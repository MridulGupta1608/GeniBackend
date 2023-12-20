const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, JWT_SECRET, (err, userData) => {
      if (err) {
        console.log("failed");
        res.status(403).json({
          message: "Forbidden",
          success: false,
        });
      } else {
        req.user_data = userData;
        console.log(userData);
        console.log("passed");
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};
