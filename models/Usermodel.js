const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const List = mongoose.model("List", listSchema);

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
    items: [listSchema],
    profileimg: String,
    coverimg: String,

  },
  { timestamps: true }
);

// Creating model for my schema
const User = mongoose.model("User", userSchema);

module.exports = User;
