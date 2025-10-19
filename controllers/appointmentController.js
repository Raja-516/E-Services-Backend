const Appointment = require("../models/Appointment");

// ✅ Create a new appointment (Patient books with Doctor)
exports.createAppointment = async (req, res) => {
  const { patientId, doctorId, date, time } = req.body;
  // Optionally: derive patientId from token later (req.userId)
  try {
    const appointment = new Appointment({ patientId, doctorId, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ error: "Server error while creating appointment" });
  }
};

// ✅ Get all appointments (Admin / for debugging)
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email");
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching all appointments:", err);
    res.status(500).json({ error: "Server error while fetching appointments" });
  }
};

// ✅ Get appointments for a specific doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId })
      .populate("patientId", "name email");
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching doctor appointments:", err);
    res.status(500).json({ error: "Server error while fetching doctor appointments" });
  }
};

// ✅ Get appointments for a specific patient
exports.getAppointmentsByPatient = async (req, res) => {
  try {
   
    const appointments = await Appointment.find({ patientId:req.params.patientId})
    .populate("doctorId", "name specialization");
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching patient appointments:", err);
    res.status(500).json({ error: "Server error while fetching patient appointments" });
  }
};

// ✅ Update prescription (Doctor updates after appointment)
exports.updatePrescription = async (req, res) => {
  try {
    const { prescription } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { prescription, status: "Completed" },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (err) {
    console.error("Error updating prescription:", err);
    res.status(500).json({ error: "Server error while updating prescription" });
  }
};
