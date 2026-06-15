const express = require("express");
const router = express.Router();
const c = require("../controllers/surveyResponseController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// V2 per-question routes
router.post("/v2", verifyToken, c.submitResponseV2);
router.get("/v2/survey/:surveyId", verifyToken, verifyAdmin, c.getResponsesBySurveyV2);
router.get("/v2/survey/:surveyId/summary", verifyToken, verifyAdmin, c.getSurveySummary);

// Legacy
router.post("/", verifyToken, c.submitResponse);
router.get("/", verifyToken, verifyAdmin, c.getAllResponses);
router.get("/survey/:surveyId", verifyToken, verifyAdmin, c.getResponsesBySurvey);

module.exports = router;
