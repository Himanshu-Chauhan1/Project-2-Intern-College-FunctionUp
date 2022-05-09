const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      uppercase:true,
      required: [true, "college name is required"],
      trim: true
    },
    fullName: {
      type: String,
      required: [true, "college first name is required"],
      trim: true
    },
    logoLink: {
      type: String,
      required: [true, "logo is required"],
      trim: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);
