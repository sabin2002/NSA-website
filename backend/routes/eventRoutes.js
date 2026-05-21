const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// Admin only
router.post("/", verifyToken, verifyAdmin, eventController.createEvent);

// Public / student view
router.get("/", eventController.getEvents);

module.exports = router;