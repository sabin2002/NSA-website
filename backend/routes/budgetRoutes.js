const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budgetController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, budgetController.createBudget);
router.get("/", budgetController.getBudgets);
router.put("/:id", verifyToken, verifyAdmin, budgetController.updateBudget);
router.delete("/:id", verifyToken, verifyAdmin, budgetController.deleteBudget);

module.exports = router;