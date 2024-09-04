const router = require("express").Router();
const {
  userValidation,
  loginValidation,
} = require("../middlewares/validation");
const { createUser, login } = require("../controllers/user");

router.post("/signin", loginValidation, login);
router.post("/signup", userValidation, createUser);
router.use("/items", require("./clothingItem"));
router.use("/users", require("./user"));

module.exports = router;
