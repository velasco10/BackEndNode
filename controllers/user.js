const ErrorResponse = require("../helper/errorResponse");
const User = require("../models/User");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, surname, username, email, password } = req.body;
    const usrBD = await User.create({
      name,
      surname,
      username,
      email,
      password,
    });

    const token = usrBD.createJsonWebToken();
    res.status(200).json({
      status: 200,
      id: usrBD._id,
      name,
      surname,
      username,
      email,
      token,
    });
  } catch (err) {
    next(new ErrorResponse("Error registrando user " + err, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Ingrese un email y un password", 400));
    }
    const userBD = await User.findOne({ email }).select("+password");

    if (!userBD) {
      return next(new ErrorResponse("No se encuentra el user", 400));
    }
    const passwordBoolean = await userBD.validatePassword(password);
    if (!passwordBoolean) {
      return next(new ErrorResponse("Credenciales incorrectas", 400));
    }
    const token = await userBD.createJsonWebToken();
    res.status(200).json({
      status: 200,
      id: userBD._id,
      name: userBD.name,
      surname: userBD.surname,
      username: userBD.username,
      email: userBD.email,
      token,
    });
  } catch (err) {
    next(new ErrorResponse("Error al logarse " + err, 400));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userToken = req.user;
    const token = await userToken.createJsonWebToken();
    res.status(200).json({
      status: 200,
      id: userToken._id,
      name: userToken.name,
      surname: userToken.surname,
      username: userToken.username,
      email: userToken.email,
      token,
    });
  } catch (err) {
    next(new ErrorResponse("Error obteniendo el user " + err, 400));
  }
};
