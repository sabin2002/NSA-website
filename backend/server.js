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

app.get("/", (req, res) => {
  res.send("NSA Website Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});