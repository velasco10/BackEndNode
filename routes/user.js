const express = require("express");
const route = express.Router();
const {security} = require("../middleware/security");

const {
  login,
  getUser,
  registerUser,
} = require("../controllers/user");

route.get("/",security, getUser);

route.post("/login", login);

route.post("/registrar", registerUser);

module.exports = route;
