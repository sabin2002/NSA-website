const db = require("../config/db");

// ── V2: per-question response ────────────────────────────────────

exports.submitResponseV2 = (req, res) => {
  const { survey_id, answers } = req.body;

  if (!survey_id || !answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ message: "survey_id and answers are required" });
  }

  // Block duplicate submissions
  db.query(
    "SELECT response_id FROM survey_question_responses WHERE survey_id = ? AND user_id = ? LIMIT 1",
    [survey_id, req.user.user_id],
    (err, existing) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to check existing response" });
      }
      if (existing.length > 0) {
        return res.status(400).json({ message: "You have already submitted this survey" });
      }

      const rows = Object.entries(answers).map(([question_id, answer_text]) => [
        survey_id,
        req.user.user_id,
        parseInt(question_id),
        String(answer_text),
      ]);

      db.query(
        "INSERT INTO survey_question_responses (survey_id, user_id, question_id, answer_text) VALUES ?",
        [rows],
        (insertErr) => {
          if (insertErr) {
            console.log(insertErr);
            return res.status(500).json({ message: "Failed to submit response" });
          }
          res.status(201).json({ message: "Survey response submitted successfully" });
        }
      );
    }
  );
};

// Admin: individual responses grouped by user
exports.getResponsesBySurveyV2 = (req, res) => {
  const { surveyId } = req.params;

  const sql = `
    SELECT
      sqr.user_id,
      u.name AS user_name,
      u.email AS user_email,
      sq.question_text,
      sq.question_type,
      sqr.answer_text,
      sqr.submitted_at
    FROM survey_question_responses sqr
    JOIN users u ON sqr.user_id = u.user_id
    JOIN survey_questions sq ON sqr.question_id = sq.question_id
    WHERE sqr.survey_id = ?
    ORDER BY sqr.user_id, sq.question_id
  `;

  db.query(sql, [surveyId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch responses" });
    }

    const grouped = {};
    result.forEach((row) => {
      if (!grouped[row.user_id]) {
        grouped[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          user_email: row.user_email,
          submitted_at: row.submitted_at,
          answers: [],
        };
      }
      grouped[row.user_id].answers.push({
        question: row.question_text,
        question_type: row.question_type,
        answer: row.answer_text,
      });
    });

    res.status(200).json(Object.values(grouped));
  });
};

// Admin: summary stats per question (for bar charts)
exports.getSurveySummary = (req, res) => {
  const { surveyId } = req.params;

  const sql = `
    SELECT
      sq.question_id,
      sq.question_text,
      sq.question_type,
      sqr.answer_text,
      COUNT(*) AS count
    FROM survey_question_responses sqr
    JOIN survey_questions sq ON sqr.question_id = sq.question_id
    WHERE sqr.survey_id = ?
    GROUP BY sq.question_id, sqr.answer_text
    ORDER BY sq.question_id, count DESC
  `;

  db.query(sql, [surveyId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch summary" });
    }

    const questions = {};
    result.forEach((row) => {
      if (!questions[row.question_id]) {
        questions[row.question_id] = {
          question_id: row.question_id,
          question_text: row.question_text,
          question_type: row.question_type,
          answers: [],
        };
      }
      questions[row.question_id].answers.push({ value: row.answer_text, count: row.count });
    });

    res.status(200).json(Object.values(questions));
  });
};

// ── Legacy single-text response ──────────────────────────────────

exports.submitResponse = (req, res) => {
  const { survey_id, response_text } = req.body;

  db.query(
    "INSERT INTO survey_responses (survey_id, user_id, response_text) VALUES (?, ?, ?)",
    [survey_id, req.user.user_id, response_text],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to submit survey response" });
      }
      res.status(201).json({ message: "Survey response submitted successfully" });
    }
  );
};

exports.getAllResponses = (req, res) => {
  const sql = `
    SELECT sr.response_id, sr.survey_id, s.title AS survey_title,
           u.name AS user_name, u.email AS user_email,
           sr.response_text, sr.submitted_at
    FROM survey_responses sr
    JOIN surveys s ON sr.survey_id = s.survey_id
    JOIN users u ON sr.user_id = u.user_id
    ORDER BY sr.submitted_at DESC
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch survey responses" });
    }
    res.status(200).json(result);
  });
};

exports.getResponsesBySurvey = (req, res) => {
  const { surveyId } = req.params;
  const sql = `
    SELECT sr.response_id, sr.survey_id, s.title AS survey_title,
           u.name AS user_name, u.email AS user_email,
           sr.response_text, sr.submitted_at
    FROM survey_responses sr
    JOIN surveys s ON sr.survey_id = s.survey_id
    JOIN users u ON sr.user_id = u.user_id
    WHERE sr.survey_id = ?
    ORDER BY sr.submitted_at DESC
  `;
  db.query(sql, [surveyId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch responses" });
    }
    res.status(200).json(result);
  });
};
