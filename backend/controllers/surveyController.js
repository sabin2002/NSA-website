const db = require("../config/db");

// Admin creates survey
exports.createSurvey = (req, res) => {
  const { title, description, deadline } = req.body;

  const sql = `
    INSERT INTO surveys (created_by_user_id, title, description, deadline)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.user.user_id, title, description, deadline],
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

// Admin adds question
exports.addQuestion = (req, res) => {
  const { survey_id, question_text, question_type, options } = req.body;

  const sql = `
    INSERT INTO questions (survey_id, question_text, question_type)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [survey_id, question_text, question_type], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to add question" });
    }

    const questionId = result.insertId;

    if (options && options.length > 0) {
      const optionValues = options.map((option) => [questionId, option]);

      db.query(
        "INSERT INTO options (question_id, option_text) VALUES ?",
        [optionValues],
        (optionErr) => {
          if (optionErr) {
            console.log(optionErr);
            return res.status(500).json({ message: "Failed to add options" });
          }

          res.status(201).json({ message: "Question and options added successfully" });
        }
      );
    } else {
      res.status(201).json({ message: "Question added successfully" });
    }
  });
};

// Get all surveys
exports.getSurveys = (req, res) => {
  const sql = "SELECT * FROM surveys ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch surveys" });
    }

    res.status(200).json(result);
  });
};

// Student submits survey
exports.submitSurvey = (req, res) => {
  const { survey_id, answers } = req.body;

  // Check duplicate submission
  const checkSql = `
    SELECT * FROM survey_responses
    WHERE survey_id = ? AND user_id = ?
  `;

  db.query(checkSql, [survey_id, req.user.user_id], (checkErr, checkResult) => {
    if (checkErr) {
      return res.status(500).json({
        message: "Server error",
      });
    }

    if (checkResult.length > 0) {
      return res.status(400).json({
        message: "You have already submitted this survey",
      });
    }

    // Insert survey response
    const responseSql = `
      INSERT INTO survey_responses (survey_id, user_id)
      VALUES (?, ?)
    `;

    db.query(responseSql, [survey_id, req.user.user_id], (responseErr, responseResult) => {
      if (responseErr) {
        return res.status(500).json({
          message: "Failed to submit survey",
        });
      }

      const responseId = responseResult.insertId;

      // Prepare answers
      const answerValues = answers.map((answer) => [
        responseId,
        answer.question_id,
        answer.option_id || null,
        answer.answer_text || null,
      ]);

      const answerSql = `
        INSERT INTO answers
        (response_id, question_id, option_id, answer_text)
        VALUES ?
      `;

      db.query(answerSql, [answerValues], (answerErr) => {
        if (answerErr) {
          console.log(answerErr);

          return res.status(500).json({
            message: "Failed to save answers",
          });
        }

        res.status(201).json({
          message: "Survey submitted successfully",
        });
      });
    });
  });
};