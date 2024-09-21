const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const InvalidLoginError = require("../utils/Errors/InvalidLoginError");

const handleAuthError = (req, res, next) => {
  next(new InvalidLoginError());
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    return handleAuthError(res);
  }

  req.user = payload;
  return next();
};
