const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resources");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, and TXT files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// Public/student
router.get("/", getResources);

// Admin only
router.post("/", verifyToken, verifyAdmin, upload.single("file"), createResource);

router.put("/:id", verifyToken, verifyAdmin, upload.single("file"), updateResource);

router.delete("/:id", verifyToken, verifyAdmin, deleteResource);

module.exports = router;