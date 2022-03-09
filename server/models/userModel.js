const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: false,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false
    },
    mobile: {
      type: String,
      default: "",
      required: false,
      trim: true,
    },
    lastLogin: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
