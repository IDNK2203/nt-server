const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// schema keys
//1. name
//2. email
//3. password
//4. password confirm
//5. photo
//6. role
//7. active
//
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please provide a name"],
  },
  email: {
    type: String,
    required: [true, "please provide a name"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please provide a name"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm a password"],
    validate: {
      // only works for SAVE and CREATE method
      validator: function (el) {
        return el === this.password;
      },
      message: "confirm your password",
    },
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "writer", "admin"],
  },
  // active: {
  //   type: Boolean,
  //   default: true,
  //   select: false,
  // },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model("user", UserSchema);
