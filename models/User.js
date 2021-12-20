const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Por favor ingrese un nombre"] },
  surname: { type: String, required: [true, "Por favor ingrese un apellido"] },
  username: { type: String, required: [true, "Por favor ingrese un username"] },
  email: {
    type: String,
    required: [true, "Por favor ingrese un email"],
    unique: true,
    match: [
      /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
      "formato incorrecto",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese un password"],
    minlength: 6,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJsonWebToken = function () {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET_WORD, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.validatePassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", UserSchema);
