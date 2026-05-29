const express = require("express");
const router = express.Router();

const noticeController = require("../controllers/noticeController");
const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, noticeController.createNotice);
router.get("/", noticeController.getNotices);
router.put("/:id", verifyToken, verifyAdmin, noticeController.updateNotice);
router.delete("/:id", verifyToken, verifyAdmin, noticeController.deleteNotice);

module.exports = router;