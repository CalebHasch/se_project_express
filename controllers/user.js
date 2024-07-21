const User = require("../models/user");
const { invalidData, notFound, defaultError } = require("../utils/error");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(invalidData).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(notFound).send({ message: err.message });
      } else {
        res.status(defaultError).send({ message: err.message });
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
        res.status(invalidData).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(notFound).send({ message: err.message });
      } else {
        res.status(defaultError).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(invalidData).send({ message: err.message });
      } else {
        res.status(defaultError).send({ message: err.message });
      }
    });
};
