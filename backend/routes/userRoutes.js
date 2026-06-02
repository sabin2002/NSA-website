const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// Logged-in user profile
router.get("/profile", verifyToken, userController.getProfile);

// Admin user management
router.get("/", verifyToken, verifyAdmin, userController.getUsers);

router.put(
  "/:id/role",
  verifyToken,
  verifyAdmin,
  userController.updateUserRole
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  userController.deleteUser
);

module.exports = router;