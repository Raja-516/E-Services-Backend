const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  updatePrescription,
} = require("../controllers/appointmentController");

const verifyToken = require("../middleware/authMiddleware"); // ✅ Correct path

// ✅ Routes
router.post("/", verifyToken, createAppointment);
router.get("/patient/:patientId", verifyToken, getAppointmentsByPatient);
router.get("/patient/:patientId", verifyToken, getAppointmentsByPatient);

router.get("/doctor/:doctorId", verifyToken, getAppointmentsByDoctor);
router.put("/:id/prescription", verifyToken, updatePrescription);

module.exports = router;
