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
router.post("/", clothingItemValidation, auth, createClothingItem);
router.delete("/:itemId", idValidation, auth, deleteClothingItem);
router.put("/:itemId/likes", idValidation, auth, likeClothingItem);
router.delete("/:itemId/likes", idValidation, auth, dislikeClothingItem);

module.exports = router;
