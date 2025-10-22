const Organization = require("../models/Organization");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/Appointment");
const verifyToken = require("../middleware/authMiddleware");


// Register org
exports.createOrganization = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const org = new Organization({ name, email, password });
    await org.save();
    res.status(201).json({ message: "Organization created" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login org
exports.loginOrganization = async (req, res) => {
  const { email, password } = req.body;
  try {
    const org = await Organization.findOne({ email });
    if (!org) return res.status(404).json({ error: "Org not found" });

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: org._id, role: "organization" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, organization: org });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add doctor under org
exports.addDoctor = async (req, res) => {
  const { name, email, password, specialization, timings } = req.body;
  try {
    const existingDoctor = await User.findOne({ email });
  if (existingDoctor) {
    return res.status(400).json({ error: "A doctor with this email already exists" });
  }
    const doctor = new User({
      name,
      email,
      password,
      role: "doctor",
      specialization,
      organizationId: req.userId,
      availability: { 
        days: timings.map(t => t.day), 
        timeSlots: timings.map(t => `${t.from}-${t.to}`) 
      },
    });
   

    await doctor.save();

    await Organization.findByIdAndUpdate(
      req.userId,
      { $push: { doctors: doctor._id } }
    );

    res.status(201).json({ message: "Doctor added", doctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// Get all doctors of org
exports.getDoctors = async (req, res) => {
  try {
    const org = await Organization.findById(req.userId)
      .populate("doctors", "name email specialization");

    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json({ doctors: org.doctors, count: org.doctors.length });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ error: "Server error while fetching doctors" });
  }
};

// Get all appointments for org
exports.getAppointments = async (req, res) => {
  try {
    const org = await Organization.findById(req.userId);
    const appointments = await Appointment.find({ doctorId: { $in: org.doctors } })
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
