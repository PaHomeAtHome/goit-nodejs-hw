const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ConflictError, ValidationError } = require("../helpers/errors");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new ConflictError("Email in use"));
  } else {
    next(new ValidationError(error));
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
