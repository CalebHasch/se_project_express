const router = require("express").Router();
const { createUser, login } = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", require("./clothingItem"));
router.use("/users", require("./user"));

module.exports = router;
