const express = require("express");
const {
  getBuyers,
  getSellers
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/getBuyers", getBuyers);
router.get("/getSellers", getSellers);


module.exports = router;
