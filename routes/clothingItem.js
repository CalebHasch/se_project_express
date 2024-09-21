const router = require("express").Router();
const {
  clothingItemValidation,
  idValidation,
} = require("../middlewares/validation");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

const auth = require("../middlewares/auth");

router.get("/", getClothingItems);
router.post("/", auth, clothingItemValidation, createClothingItem);
router.delete("/:itemId", auth, idValidation, deleteClothingItem);
router.put("/:itemId/likes", auth, idValidation, likeClothingItem);
router.delete("/:itemId/likes", auth, idValidation, dislikeClothingItem);

module.exports = router;
