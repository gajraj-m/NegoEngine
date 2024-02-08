const Buyer = require("../models/buyer.model.js");
const Seller = require("../models/seller.model.js");

const getBuyers = async (req, res, next) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (error) {
    next(error);
  }
};

const getSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBuyers,
  getSellers,
};
