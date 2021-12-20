const ErrorResponse = require("../helper/errorResponse");
const Book = require("../models/Book");

exports.getBooks = async (req, res, next) => {
  try {
    const bookList = await Book.find();

    res.status(200).json(bookList);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json(book);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo encontrar el book " + err.message, 400)
    );
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(200).json({
      status: 200,
      data: newBook,
    });
  } catch (err) {
    next(new ErrorResponse("No se pudo crear el book " + err.message, 400));
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 200,
      data: updateBook,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo modificar el book " + err.message, 400)
    );
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const oldBook = await Book.findByIdAndDelete(req.body);

    if (!oldBook) {
      return next(new ErrorResponse("No se pudo encontrar el book ", 400));
    }
    res.status(200).json({
      status: 200,
      data: oldBook,
    });
  } catch (err) {
    next(new ErrorResponse("No se pudo borrar el book " + err.message, 400));
  }
};
exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirecion = req.body.sortDirecion;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let filterValue = "";
    let filterProperty = "";
    let books = [];

    let totalRows = 0;
    // filterValue = { valor:"" , propiedad : ""}
    if (req.body.filterValue) {
      filterValue = req.body.filterValue.valor;
      filterProperty = req.body.filterValue.propiedad;

      books = await Book.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      })
        .sort({ [sort]: sortDirecion })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Book.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      }).count();
    } else {
      books = await Book.find()
        .sort({ [sort]: sortDirecion })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Book.find().count();
    }

    const pagesQuantity = Math.ceil(totalRows / pageSize);

    res.status(200).json({
      status: 200,
      pageSize,
      page,
      sort,
      sortDirecion,
      pagesQuantity,
      totalRows,
      data: books,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};
