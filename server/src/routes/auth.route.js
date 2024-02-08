const express = require("express");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/buyer/register", authController.registerBuyer);
router.post("/seller/register", authController.registerSeller);
router.post("/buyer/login", authController.loginBuyer);
router.post("/seller/login", authController.loginSeller);
router.get("/signout", authController.signout);

module.exports = router;
