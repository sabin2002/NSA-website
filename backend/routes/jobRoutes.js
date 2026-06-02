const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, jobController.createJob);
router.get("/", jobController.getJobs);
router.put("/:id", verifyToken, verifyAdmin, jobController.updateJob);
router.delete("/:id", verifyToken, verifyAdmin, jobController.deleteJob);

module.exports = router;