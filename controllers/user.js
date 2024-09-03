const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const NotFoundError = require("../utils/Errors/NotFoundError");
const InvalidDataError = require("../utils/Errors/InvalidDataError");
const InvalidLoginError = require("../utils/Errors/InvalidLoginError");
const MongoValidationError = require("../utils/Errors/MongoValidationError");

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          res.send({ name: user.name, avatar: user.avatar, email: user.email });
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new InvalidDataError());
          } else if (err.name === "MongoServerError") {
            next(new MongoValidationError());
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "No password or email") {
        next(new InvalidDataError());
      } else {
        next(new InvalidLoginError());
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new InvalidDataError());
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("sorry"));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new InvalidDataError());
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError());
      } else {
        next(err);
      }
    });
};
