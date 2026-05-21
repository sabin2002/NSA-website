const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/admin-test", verifyToken, verifyAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;