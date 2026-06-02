const db = require("../config/db");

// Create Survey
exports.createSurvey = (req, res) => {
  const { title, description, deadline } = req.body;

  const sql = `
    INSERT INTO surveys
    (created_by_user_id, title, description, deadline)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.user.user_id, title, description, deadline || null],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create survey" });
      }

      res.status(201).json({
        message: "Survey created successfully",
        survey_id: result.insertId,
      });
    }
  );
};

// Get Surveys
exports.getSurveys = (req, res) => {
  const sql = `
    SELECT *
    FROM surveys
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch surveys" });
    }

    res.status(200).json(result);
  });
};

// Update Survey
exports.updateSurvey = (req, res) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;

  const sql = `
    UPDATE surveys
    SET title = ?, description = ?, deadline = ?
    WHERE survey_id = ?
  `;

  db.query(
    sql,
    [title, description, deadline || null, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update survey" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Survey not found" });
      }

      res.status(200).json({ message: "Survey updated successfully" });
    }
  );
};

// Delete Survey
exports.deleteSurvey = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM surveys
    WHERE survey_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete survey" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Survey not found" });
    }

    res.status(200).json({ message: "Survey deleted successfully" });
  });
};