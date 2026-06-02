const db = require("../config/db");

// Create Budget Record
exports.createBudget = (req, res) => {
  const { title, amount, type, description } = req.body;

  const sql = `
    INSERT INTO budget
    (created_by_user_id, title, amount, type, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.user.user_id, title, amount, type, description],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create budget record" });
      }

      res.status(201).json({ message: "Budget record created successfully" });
    }
  );
};

// Get All Budget Records
exports.getBudgets = (req, res) => {
  const sql = "SELECT * FROM budget ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch budget records" });
    }

    res.status(200).json(result);
  });
};

// Update Budget Record
exports.updateBudget = (req, res) => {
  const { id } = req.params;
  const { title, amount, type, description } = req.body;

  const sql = `
    UPDATE budget
    SET title = ?, amount = ?, type = ?, description = ?
    WHERE budget_id = ?
  `;

  db.query(sql, [title, amount, type, description, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to update budget record" });
    }

    res.status(200).json({ message: "Budget record updated successfully" });
  });
};

// Delete Budget Record
exports.deleteBudget = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM budget WHERE budget_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete budget record" });
    }

    res.status(200).json({ message: "Budget record deleted successfully" });
  });
};