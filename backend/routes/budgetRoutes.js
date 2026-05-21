const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budgetController");
const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, budgetController.createBudget);
router.get("/", budgetController.getBudget);

module.exports = router;