const { Router } = require("express");
const express = require("express");
const route = express.Router();

const { crearAutor, getAutor, getAutorById, updateAutor, deleteAutor } = require("../controllers/autor");

route.route("/").post(crearAutor).get(getAutor);

route.route("/:id").get(getAutorById).put(updateAutor).delete(deleteAutor)

module.exports = route;
