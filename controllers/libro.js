const ErrorResponse = require("../helper/errorResponse");
const Libro = require("../models/libro");

exports.getLibros = async (req, res, next) => {
  try {
    const libroLista = await Libro.find();

    res.status(200).json(libroLista);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};

exports.getLibroById = async (req, res, next) => {
  try {
    const libro = await Libro.findById(req.params.id);

    res.status(200).json(libroLista);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo encontrar el libro " + err.message, 400)
    );
  }
};

exports.createLibro = async (req, res, next) => {
  try {
    const newLibro = await Libro.create(req.body);

    res.status(200).json({
      status: 200,
      data: newLibro,
    });
  } catch (err) {
    next(new ErrorResponse("No se pudo crear el libro " + err.message, 400));
  }
};

exports.updateLibro = async (req, res, next) => {
  try {
    const updateLibro = await Libro.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 200,
      data: updateLibro,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo modificar el libro " + err.message, 400)
    );
  }
};

exports.deleteLibro = async (req, res, next) => {
  try {
    const oldLibro = await Libro.findByIdAndDelete(req.body);

    if (!oldLibro) {
      return next(new ErrorResponse("No se pudo encontrar el libro ", 400));
    }
    res.status(200).json({
      status: 200,
      data: oldLibro,
    });
  } catch (err) {
    next(new ErrorResponse("No se pudo borrar el libro " + err.message, 400));
  }
};
exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirection = req.body.sortDirection;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let filterVal = "";
    let filterPropiedad = "";
    let libros = [];

    let totalRows = 0;

    // filterValue = {valor:"", propiedad:""}
    if (req.body.filterValue) {
    filterVal = req.body.filterValue.valor
    filterPropiedad = req.body.filterValue.filterPropiedad

    libros = await Libro
      .find({[filterPropiedad]: new RegExp(filterVal,"i")})
      .sort({ [sort]: sortDirection })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

      totalRows = await Libro.find().count();
    } else {
      libros = await Libro
        .find()
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Libro.find().count();
    }

    const pagesQuantity = Math.cell(totalRows / pageSize)

    res.status(200).json({
      status:200,
      pageSize,
      page,
      sort,
      sortDirection,
      pagesQuantity,
      totalRows,
      data:libros
    })
  } catch (err) {
    next(new ErrorResponse("No se pudo borrar el libro " + err.message, 400));
  }
};
