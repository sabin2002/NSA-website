const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // Fixes TCP_TOO_OLD on Railway
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  idleTimeout: 60000,
  connectTimeout: 10000,
});

// Ping every 30s to keep connections alive
setInterval(() => {
  db.query("SELECT 1", (err) => {
    if (err) console.log("DB keep-alive failed:", err.message);
  });
}, 30000);

db.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully!");
    connection.release();
  }
});

module.exports = db;
