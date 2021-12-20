const express = require("express");
const route = express.Router();
const { security } = require("../middleware/security");

const {
  createAutor,
  getAutor,
  getAutorById,
  updateAutor,
  deleteAutor,
} = require("../controllers/autor");

route.route("/").post(security, createAutor).get(security, getAutor);

route
  .route("/:id")
  .get(security, getAutorById)
  .put(security, updateAutor)
  .delete(security, deleteAutor);

module.exports = route;
