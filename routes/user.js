const router = require("express").Router();
const { getUsers, getUser, createUser, login } = require("../controllers/user");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
