const express = require("express");
const { getNego, postNego } = require("../controllers/nego.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/getNego/:id", getNego);
router.post("/postNego/:id", postNego);

module.exports = router;
