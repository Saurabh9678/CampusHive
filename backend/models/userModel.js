const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "please provide your username"]
    },
    college: {
        type: String,
        required: [true, "Please provide your college"]
    },
    username: {
        type: String,
        required: [true,"Please provide a unique username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true
    },
    password:{
        type: String,
        required:[true, "Please provide a password"]
    }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  else this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);
