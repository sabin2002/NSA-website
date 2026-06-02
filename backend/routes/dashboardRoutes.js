const express = require("express");
const router = express.Router();

console.log("Dashboard routes loaded");

const dashboardController = require("../controllers/dashboardController");

router.get("/", (req, res) => {
  res.send("Dashboard root works");
});

router.get("/stats", dashboardController.getStats);

module.exports = router;