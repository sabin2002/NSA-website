const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, eventController.createEvent);
router.get("/", eventController.getEvents);
router.put("/:id", verifyToken, verifyAdmin, eventController.updateEvent);
router.delete("/:id", verifyToken, verifyAdmin, eventController.deleteEvent);

module.exports = router;