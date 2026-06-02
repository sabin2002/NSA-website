const express = require("express");
const router = express.Router();

const surveyResponseController = require("../controllers/surveyResponseController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// Student submits response
router.post("/", verifyToken, surveyResponseController.submitResponse);

// Admin views all responses
router.get("/", verifyToken, verifyAdmin, surveyResponseController.getAllResponses);

// Admin views responses by survey
router.get(
  "/survey/:surveyId",
  verifyToken,
  verifyAdmin,
  surveyResponseController.getResponsesBySurvey
);

module.exports = router;