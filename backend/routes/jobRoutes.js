const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, jobController.createJob);
router.get("/", jobController.getJobs);

module.exports = router;