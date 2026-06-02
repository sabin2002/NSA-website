const express = require("express");
const router = express.Router();

const eventRegistrationController = require("../controllers/eventRegistrationController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// Student
router.post(
  "/",
  verifyToken,
  eventRegistrationController.registerEvent
);

// Admin
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  eventRegistrationController.getAllRegistrations
);

router.get(
  "/event/:eventId",
  verifyToken,
  verifyAdmin,
  eventRegistrationController.getEventParticipants
);

module.exports = router;