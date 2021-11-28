const express = require("express");
const route = express.Router();

const {
  getLibroById,
  getLibros,
  createLibro,
  deleteLibro,
  updateLibro,
  pagination
} = require("../controllers/libro");

route.route("/").get(getLibros).post(createLibro);

route.route("/:id").get(getLibroById).put(updateLibro).delete(deleteLibro);

route.route("/pagination").post(pagination)
module.exports = route;
