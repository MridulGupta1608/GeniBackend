const User = require("../Models/user.model");
const { createJwtToken } = require("../utils/token.util");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const hashPassword = await bcrypt.compare(password, user.password);

    if (user && hashPassword) {
      const token = createJwtToken({ userId: user._id });

      res.status(200).json({
        type: "success",
        message: "Credential verified",
        data: {
          token,
          email,
          userId: user._id,
        },
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log("error");
    res.sendStatus(400);
  }
};

exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(200).json({
        type: "success",
        message: "Account already exists",
        data: {
          userId: existingUser._id,
        },
      });
      return;
    }

    const createUser = new User({
      name,
      email,
      password: hash,
    });

    const user = await createUser.save();
    const token = createJwtToken({ userId: user._id });

    res.status(200).json({
      type: "success",
      message: "Account created",
      data: {
        token,
        email: email,
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
