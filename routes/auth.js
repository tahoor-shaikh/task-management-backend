const express = require("express");
const router = express.Router();
const {
	signup,
	login,
	changePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);

router.use(authMiddleware);
router.post("/change-password", changePassword);

module.exports = router;
