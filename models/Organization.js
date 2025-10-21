const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  doctors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" } // store doctor IDs
  ],
}, { timestamps: true });

module.exports = mongoose.model("Organization", organizationSchema);
