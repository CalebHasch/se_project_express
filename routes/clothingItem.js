const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

router.get("/", getClothingItems);
router.post("/private", createClothingItem);
router.delete("/private/:itemId", deleteClothingItem);
router.put("/private/:itemId/likes", likeClothingItem);
router.delete("/private/:itemId/likes", dislikeClothingItem);

module.exports = router;
