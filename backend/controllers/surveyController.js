const db = require("../config/db");

// Create Survey with questions
exports.createSurvey = (req, res) => {
  const { title, description, deadline, questions } = req.body;

  const surveySql = `
    INSERT INTO surveys (created_by_user_id, title, description, deadline)
    VALUES (?, ?, ?, ?)
  `;

  db.query(surveySql, [req.user.user_id, title, description, deadline || null], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to create survey" });
    }

    const surveyId = result.insertId;

    if (!questions || questions.length === 0) {
      return res.status(201).json({ message: "Survey created successfully", survey_id: surveyId });
    }

    const questionSql = `
      INSERT INTO survey_questions (survey_id, question_text, question_type, options, is_required)
      VALUES ?
    `;

    const questionValues = questions.map((q) => [
      surveyId,
      q.question_text,
      q.question_type,
      q.question_type === "mcq" || q.question_type === "checkbox"
        ? JSON.stringify(q.options || [])
        : null,
      q.is_required ? 1 : 0,
    ]);

    db.query(questionSql, [questionValues], (qErr) => {
      if (qErr) {
        console.log(qErr);
        return res.status(500).json({ message: "Survey created but questions failed to save" });
      }
      res.status(201).json({ message: "Survey and questions created successfully", survey_id: surveyId });
    });
  });
};

// Get all surveys
exports.getSurveys = (req, res) => {
  db.query("SELECT * FROM surveys ORDER BY created_at DESC", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch surveys" });
    }
    res.status(200).json(result);
  });
};

// Get questions for a survey
exports.getSurveyQuestions = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM survey_questions WHERE survey_id = ? ORDER BY question_id ASC",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to fetch questions" });
      }
      res.status(200).json(result);
    }
  );
};

// Update survey metadata + replace questions
exports.updateSurvey = (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, questions } = req.body;

  db.query(
    "UPDATE surveys SET title = ?, description = ?, deadline = ? WHERE survey_id = ?",
    [title, description, deadline || null, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update survey" });
      }
      if (result.affectedRows === 0) return res.status(404).json({ message: "Survey not found" });

      if (!questions || questions.length === 0) {
        return res.status(200).json({ message: "Survey updated successfully" });
      }

      db.query("DELETE FROM survey_questions WHERE survey_id = ?", [id], (delErr) => {
        if (delErr) {
          console.log(delErr);
          return res.status(500).json({ message: "Failed to replace questions" });
        }

        const questionSql = `
          INSERT INTO survey_questions (survey_id, question_text, question_type, options, is_required)
          VALUES ?
        `;

        const questionValues = questions.map((q) => [
          id,
          q.question_text,
          q.question_type,
          q.question_type === "mcq" || q.question_type === "checkbox"
            ? JSON.stringify(q.options || [])
            : null,
          q.is_required ? 1 : 0,
        ]);

        db.query(questionSql, [questionValues], (qErr) => {
          if (qErr) {
            console.log(qErr);
            return res.status(500).json({ message: "Survey updated but questions failed" });
          }
          res.status(200).json({ message: "Survey updated successfully" });
        });
      });
    }
  );
};

// Delete survey
exports.deleteSurvey = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM surveys WHERE survey_id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete survey" });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: "Survey not found" });
    res.status(200).json({ message: "Survey deleted successfully" });
  });
};
