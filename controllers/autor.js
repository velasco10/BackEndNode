const ErrorResponse = require("../helper/errorResponse")
const Autor = require("../models/Autor");

exports.crearAutor = async (req, res, next) => {
  try {
    const autorData = await Autor.create(req.body);
    console.log("autor data", autorData);
    res.status(200).json({
      status: 200,
      data: autorData,
    });
  } catch (err) {
    next(new ErrorResponse("No es posible crear el autor " + err.message, 400));
  }
};

exports.getAutor = async (req, res, next) => {
  try {
    const autorLista = await Autor.find();
    res.status(200).json(autorLista);
  } catch (err) {
    next(new ErrorResponse("No se pudo procesar la peticion " + err.message, 400));
  }
};

exports.getAutorById = async (req, res, next) => {
  try {
    const autor = await Autor.findById(req.params.id);
    res.status(200).json(autor);
    if(!autor) {
      return next(new ErrorResponse("El autor no existe en la bd con este id " + req.params.id, 400));

    }
  } catch (err) {
    next(new ErrorResponse("El autor no exiate con este id " + req.params.id, 400));

  }
};

exports.updateAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body);
    if(!autor){
      next(new ErrorResponse("El autor no exiate con este id " + req.params.id, 400));
    }
    res.status(200).json({status:200,data:autor});
  } catch (err) {
    next(new ErrorResponse("El autor no exiate con este id " + req.params.id, 400));
  }
};

exports.deleteAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id);
    if(!autor){
      next(new ErrorResponse("El autor no exiate con este id " + req.params.id, 400));
    }
    res.status(200).json({status:200,data:autor});
  } catch (err) {
    next(new ErrorResponse("El autor no exiate con este id " + req.params.id, 400));

  }
};