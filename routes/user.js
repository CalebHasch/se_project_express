const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/user");
const { userUpdateValidation } = require("../middlewares/validation");

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, userUpdateValidation, updateUser);

module.exports = router;
