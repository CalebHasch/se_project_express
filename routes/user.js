const router = require("express").Router();
const {
  getCurrentUser,
  createUser,
  login,
  updateUser,
} = require("../controllers/user");

const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/me", auth, getCurrentUser);
router.post("/me", auth, updateUser);

module.exports = router;
