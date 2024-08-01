const jwt = require("jsonwebtoken");
const { invalidLogin } = require("../utils/error");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (res) => {
  res.status(invalidLogin.status).send({ message: "Authorization Error" });
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
  next();
};
