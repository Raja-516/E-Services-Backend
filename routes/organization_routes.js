const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const Organization = require("../models/Organization");
const {
  createOrganization,
  loginOrganization,
  addDoctor,
  getDoctors,
  getAppointments
} = require("../controllers/organizationController");

// Org signup & login
router.post("/signup", createOrganization);
router.post("/login", loginOrganization);

// Doctor management
router.post("/doctors", verifyToken, addDoctor);
router.get("/doctors", verifyToken, getDoctors);

// Appointments
router.get("/appointments", verifyToken, getAppointments);

// New route to fetch doctors by orgId
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all organizations..."); // 👈 debug
    const orgs = await Organization.find().select("name email");
    console.log("Found orgs:", orgs.length); // 👈 debug
    res.json(orgs);
  } catch (err) {
    console.error("Error fetching organizations:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});


// 2) get doctors for a specific org (can be public or protected — here public)
router.get("/:orgId/doctors", async (req, res) => {
  try {
    const org = await Organization.findById(req.params.orgId).populate(
      "doctors",
      "name email specialization"
    );
    if (!org) return res.status(404).json({ error: "Organization not found" });
    res.json(org.doctors);
  } catch (err) {
    console.error("Get doctors by org error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
