const db = require("../config/db");

// Submit survey response
exports.submitResponse = (req, res) => {
  const { survey_id, response_text } = req.body;

  const sql = `
    INSERT INTO survey_responses
    (survey_id, user_id, response_text)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [survey_id, req.user.user_id, response_text],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to submit survey response",
        });
      }

      res.status(201).json({
        message: "Survey response submitted successfully",
      });
    }
  );
};

// Get all responses
exports.getAllResponses = (req, res) => {
  const sql = `
    SELECT 
      sr.response_id,
      sr.survey_id,
      s.title AS survey_title,
      u.name AS user_name,
      u.email AS user_email,
      sr.response_text,
      sr.submitted_at
    FROM survey_responses sr
    JOIN surveys s ON sr.survey_id = s.survey_id
    JOIN users u ON sr.user_id = u.user_id
    ORDER BY sr.submitted_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to fetch survey responses",
      });
    }

    res.status(200).json(result);
  });
};

// Get responses by survey ID
exports.getResponsesBySurvey = (req, res) => {
  const { surveyId } = req.params;

  const sql = `
    SELECT 
      sr.response_id,
      sr.survey_id,
      s.title AS survey_title,
      u.name AS user_name,
      u.email AS user_email,
      sr.response_text,
      sr.submitted_at
    FROM survey_responses sr
    JOIN surveys s ON sr.survey_id = s.survey_id
    JOIN users u ON sr.user_id = u.user_id
    WHERE sr.survey_id = ?
    ORDER BY sr.submitted_at DESC
  `;

  db.query(sql, [surveyId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to fetch responses for this survey",
      });
    }

    res.status(200).json(result);
  });
};