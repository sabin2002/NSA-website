const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/surveyController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, surveyController.createSurvey);
router.get("/", surveyController.getSurveys);
router.put("/:id", verifyToken, verifyAdmin, surveyController.updateSurvey);
router.delete("/:id", verifyToken, verifyAdmin, surveyController.deleteSurvey);

module.exports = router;