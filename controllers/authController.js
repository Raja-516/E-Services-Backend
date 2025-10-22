const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, role, specialization } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const user = new User({ name, email, password, role, specialization });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

      

exports.getPatientById = async (req, res) => {
  try {
    const patient = await User.findById(req.params.id)
      .select("name email organizationId")
      .populate("organizationId", "name"); // Populate org name
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.json({
      ...patient.toObject(),
      organizationName: patient.organizationId?.name || "N/A",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// userController.js
exports.updateAvailability = async (req, res) => {
  try {
    const userId = req.userId; // set by verifyToken middleware
    const { days, timeSlots } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.role !== "doctor") return res.status(403).json({ error: "Only doctors can set availability" });

    user.availability = { days, timeSlots };
    await user.save();

    res.json({ message: "Availability updated successfully", availability: user.availability });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
