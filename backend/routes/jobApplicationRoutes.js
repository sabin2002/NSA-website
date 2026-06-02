const express = require("express");
const router = express.Router();

const jobApplicationController = require("../controllers/jobApplicationController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// Student applies
router.post("/", verifyToken, jobApplicationController.applyJob);

// Admin views results
router.get("/", verifyToken, verifyAdmin, jobApplicationController.getApplications);

module.exports = router;