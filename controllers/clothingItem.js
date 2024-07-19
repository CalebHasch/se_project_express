const ClothingItem = require("../models/clothingItem");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl, userId } = req.body;

  ClothingItem.create({ name, weather, imageUrl, user: userId })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
