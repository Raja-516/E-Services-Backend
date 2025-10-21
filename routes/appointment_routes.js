const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const verifyToken = require("../middleware/authMiddleware");


const {
  createAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  updatePrescription,
  
} = require("../controllers/appointmentController");




// ✅ Routes
router.post("/", verifyToken, createAppointment);
router.get("/patient/:patientId", verifyToken, getAppointmentsByPatient);
// ✅ Update appointment status
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/doctor/:doctorId", verifyToken, getAppointmentsByDoctor);
router.put("/:id/prescription", verifyToken, updatePrescription);

module.exports = router;
