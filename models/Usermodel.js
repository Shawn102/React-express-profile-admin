const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    adminPassword: String,
  },
  { timestamps: true }
);

// Creating model for my schema
const User = mongoose.model("User", userSchema);


module.exports = User;