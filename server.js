const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth_routes");
const appointmentRoutes = require("./routes/appointment_routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB connection error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
