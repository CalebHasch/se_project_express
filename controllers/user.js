const bycrypt = require("bycryptjs");

const User = require("../models/user");
const { invalidData, notFound, defaultError } = require("../utils/error");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(notFound.status).send({ message: notFound.message });
      } else {
        res.status(defaultError.status).send({ message: defaultError.message });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
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

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bycrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, hash })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          res.status(invalidData.status).send({ message: invalidData.message });
        } else {
          res
            .status(defaultError.status)
            .send({ message: defaultError.message });
        }
      });
  });
};
