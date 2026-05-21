const db = require("../config/db");

exports.createJob = (req, res) => {
  const { title, description, contact_info, deadline } = req.body;

  const sql = `
    INSERT INTO job_listings 
    (created_by_user_id, title, description, contact_info, deadline)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.user.user_id, title, description, contact_info, deadline],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create job listing" });
      }

      res.status(201).json({ message: "Job listing created successfully" });
    }
  );
};

exports.getJobs = (req, res) => {
  const sql = "SELECT * FROM job_listings ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch job listings" });
    }

    res.status(200).json(result);
  });
};