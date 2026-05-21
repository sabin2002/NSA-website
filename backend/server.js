const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");


const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);

const noticeRoutes = require("./routes/noticeRoutes");
app.use("/api/notices", noticeRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const budgetRoutes = require("./routes/budgetRoutes");
app.use("/api/budget", budgetRoutes);

app.get("/", (req, res) => {
  res.send("NSA Website Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});