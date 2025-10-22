const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor"], default: "patient" },
  specialization: { type: String },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },

  // ✅ Doctor Availability
  availability: {
    days: {
      type: [String], // e.g. ["Mon", "Wed", "Fri"]
      default: [],
    },
    timeSlots: {
      type: [String], // e.g. ["09:00-12:00", "14:00-17:00"]
      default: [],
    },
  },
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
