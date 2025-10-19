const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth_routes");
const appointmentRoutes = require("./routes/appointment_routes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("E-Patient backend running successfully 🚀");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// ❌ REMOVE app.listen() for Vercel — it runs automatically
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Export app instead
module.exports = app;
