const express = require("express");
const router = express.Router();

const noticeController = require("../controllers/noticeController");
const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, noticeController.createNotice);
router.get("/", noticeController.getNotices);

module.exports = router;