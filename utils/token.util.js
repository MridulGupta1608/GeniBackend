const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.createJwtToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
};
