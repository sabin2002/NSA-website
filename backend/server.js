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

const surveyRoutes = require("./routes/surveyRoutes");
app.use("/api/surveys", surveyRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

const surveyResponseRoutes = require("./routes/surveyResponseRoutes");
app.use("/api/survey-responses", surveyResponseRoutes);

app.get("/", (req, res) => {
  res.send("NSA Website Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.get("/hello", (req, res) => {
  res.send("HELLO WORKS");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});