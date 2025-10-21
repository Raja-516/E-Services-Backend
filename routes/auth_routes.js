const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { getPatientById } = require("../controllers/authController");
const { signup, login, getDoctors } = require("../controllers/authController");

// Existing signup/login routes
router.post("/signup", signup);
router.post("/login", login);

// New route to get patient info
router.get("/patient/:id", verifyToken, getPatientById);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { signup, login, getDoctors } = require("../controllers/authController");

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/doctors", getDoctors);

// module.exports = router;
