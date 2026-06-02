const db = require("../config/db");

exports.getStats = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM events) AS events,
      (SELECT COUNT(*) FROM notices) AS notices,
      (SELECT COUNT(*) FROM job_listings) AS jobs,
      (SELECT COUNT(*) FROM surveys) AS surveys
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to fetch dashboard stats",
      });
    }

    res.status(200).json(result[0]);
  });
};