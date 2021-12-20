const express = require("express");
const route = express.Router();
const { security } = require("../middleware/security");

const {
  getBookById,
  getBooks,
  createBook,
  deleteBook,
  updateBook,
  pagination,
} = require("../controllers/book");

route.route("/").post(security, createBook).get(security, getBooks);

route
  .route("/:id")
  .get(security, getBookById)
  .put(security, updateBook)
  .delete(security, deleteBook);

route.route("/pagination").post(security, pagination);
module.exports = route;
