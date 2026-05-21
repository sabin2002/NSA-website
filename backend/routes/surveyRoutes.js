const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/surveyController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, surveyController.createSurvey);
router.post("/question", verifyToken, verifyAdmin, surveyController.addQuestion);
router.get("/", surveyController.getSurveys);
router.post("/submit", verifyToken, surveyController.submitSurvey);

module.exports = router;