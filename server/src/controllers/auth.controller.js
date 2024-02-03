const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({ fullname, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};

module.exports = {
  login,
  register,
  signout,
};
