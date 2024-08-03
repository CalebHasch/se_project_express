const ClothingItem = require("../models/clothingItem");
const {
  invalidData,
  notAuthorized,
  notFound,
  defaultError,
} = require("../utils/error");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => {
      console.error(err);
      res.status(defaultError.status).send({ message: defaultError.message });
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(invalidData.status).send({ message: invalidData.message });
      } else {
        res.status(defaultError.status).send({ message: defaultError.message });
      }
    });
};

module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        res
          .status(notAuthorized.status)
          .send({ message: notAuthorized.message });
      } else {
        item.delete().then(() => res.send({ data: item }));
      }
    })
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

module.exports.likeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
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

module.exports.dislikeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
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
