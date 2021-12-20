const mongoose = require("mongoose");

const AutorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  academyGrade: String,
  completeName: String,
});

module.exports = mongoose.model('Autor', AutorSchema)