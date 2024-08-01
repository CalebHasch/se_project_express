const router = require("express").Router();
const {
  getCurrentUser,
  createUser,
  login,
  updateUser,
} = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/private/me", getCurrentUser);
router.post("/private/me", updateUser);

module.exports = router;
