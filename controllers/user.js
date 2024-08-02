const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  invalidData,
  invalidLogin,
  notFound,
  mongoValidation,
  defaultError,
} = require("../utils/error");
const { JWT_SECRET } = require("../utils/config");

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        console.log(user);
        res.send({ name: user.name, avatar: user.avatar, email: user.email });
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          res.status(invalidData.status).send({ message: invalidData.message });
        } else if (err.name === "MongoServerError") {
          res
            .status(mongoValidation.status)
            .send({ message: mongoValidation.message });
        } else {
          console.log(err.name);
          res
            .status(defaultError.status)
            .send({ message: defaultError.message });
        }
      });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "No password or email") {
        res.status(invalidData.status).send({ message: invalidData.message });
      } else {
        res.status(invalidLogin.status).send({ message: invalidLogin.message });
      }
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(invalidData.status).send({ message: invalidData.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(notFound.status).send({ message: notFound.message });
      } else {
        res.status(defaultError.status).send({ message: defaultError.message });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(invalidData.status).send({ message: invalidData.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(notFound.status).send({ message: notFound.message });
      } else {
        res.status(defaultError.status).send({ message: defaultError.message });
      }
    });
};
