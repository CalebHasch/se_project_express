const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../utils/Errors/NotFoundError");
const InvalidDataError = require("../utils/Errors/InvalidDataError");
const NotAuthorizedError = require("../utils/Errors/NotAuthorizedError");

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new InvalidDataError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        throw new NotAuthorizedError();
      } else {
        item.delete().then(() => res.send({ data: item }));
      }
    })
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

module.exports.likeClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
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

module.exports.dislikeClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
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
