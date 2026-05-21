const db = require("../config/db");

exports.createBudget = (req, res) => {
  const { title, amount, transaction_type, transaction_date, description } = req.body;

  const sql = `
    INSERT INTO budget
    (created_by_user_id, title, amount, transaction_type, transaction_date, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.user.user_id, title, amount, transaction_type, transaction_date, description],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create budget record" });
      }

      res.status(201).json({ message: "Budget record created successfully" });
    }
  );
};

exports.getBudget = (req, res) => {
  const sql = "SELECT * FROM budget ORDER BY transaction_date DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch budget records" });
    }

    res.status(200).json(result);
  });
};