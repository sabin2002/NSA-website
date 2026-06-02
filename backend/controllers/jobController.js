const db = require("../config/db");

// Create Job
exports.createJob = (req, res) => {
  const {
    title,
    company,
    location,
    job_type,
    description,
    contact_info,
    deadline,
  } = req.body;

  const sql = `
    INSERT INTO job_listings
    (created_by_user_id, title, company, location, job_type, description, contact_info, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      req.user.user_id,
      title,
      company,
      location,
      job_type,
      description,
      contact_info,
      deadline || null,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create job" });
      }

      res.status(201).json({ message: "Job created successfully" });
    }
  );
};

// Get Jobs
exports.getJobs = (req, res) => {
  const sql = "SELECT * FROM job_listings ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch jobs" });
    }

    res.status(200).json(result);
  });
};

// Update Job
exports.updateJob = (req, res) => {
  const { id } = req.params;

  const {
    title,
    company,
    location,
    job_type,
    description,
    contact_info,
    deadline,
  } = req.body;

  const sql = `
    UPDATE job_listings
    SET title = ?, company = ?, location = ?, job_type = ?, description = ?, contact_info = ?, deadline = ?
    WHERE job_id = ?
  `;

  db.query(
    sql,
    [
      title,
      company,
      location,
      job_type,
      description,
      contact_info,
      deadline || null,
      id,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update job" });
      }

      res.status(200).json({ message: "Job updated successfully" });
    }
  );
};

// Delete Job
exports.deleteJob = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM job_listings WHERE job_id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete job" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  });
};