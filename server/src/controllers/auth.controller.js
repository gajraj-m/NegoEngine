const Buyer = require("../models/buyer.model.js");
const Seller = require("../models/seller.model.js");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const registerBuyer = async (req, res, next) => {
  const { fullname, email, password, rating, numberOfUsers } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new Buyer({
    fullname,
    email,
    password: hashedPassword,
    rating,
    numberOfUsers,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const registerSeller = async (req, res, next) => {
  const { fullname, email, password, rating, numberOfSales } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new Seller({
    fullname,
    email,
    password: hashedPassword,
    rating,
    numberOfSales,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const loginBuyer = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Buyer.findOne({ email });
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

const loginSeller = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Seller.findOne({ email });
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
  loginBuyer,
  loginSeller,
  registerBuyer,
  registerSeller,
  signout,
};
