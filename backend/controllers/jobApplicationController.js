const db = require("../config/db");

// Student applies for job
exports.applyJob = (req, res) => {
  const { job_id, message } = req.body;

  const sql = `
    INSERT INTO job_applications
    (job_id, user_id, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [job_id, req.user.user_id, message || null], (err) => {
    if (err) {
      console.log(err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "You already applied for this job",
        });
      }

      return res.status(500).json({
        message: "Failed to apply for job",
      });
    }

    res.status(201).json({
      message: "Job application submitted successfully",
    });
  });
};

// Admin views all job applications
exports.getApplications = (req, res) => {
  const sql = `
    SELECT
      ja.application_id,
      j.title AS job_title,
      j.company,
      u.name AS student_name,
      u.email,
      u.student_id,
      ja.message,
      ja.applied_at
    FROM job_applications ja
    JOIN job_listings j ON ja.job_id = j.job_id
    JOIN users u ON ja.user_id = u.user_id
    ORDER BY ja.applied_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to fetch job applications",
      });
    }

    res.status(200).json(result);
  });
};