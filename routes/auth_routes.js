const express = require("express");
const router = express.Router();
const { signup, login, getDoctors } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/doctors", getDoctors);

module.exports = router;
