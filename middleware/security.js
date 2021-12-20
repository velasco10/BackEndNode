const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.security = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("El cliente no envio el token", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
    console.log("token", decoded);
    const userBD = await User.findOne({
      username: decoded.username,
    });

    req.user = userBD;
    next();
  } catch (err) {
    return next(new ErrorResponse("Errores en el procesamiento del token", 400));
  }
};
