const db = require("../config/db");

exports.createNotice = (req, res) => {
  const { title, content } = req.body;

  const sql = `
    INSERT INTO notices (created_by_user_id, title, content)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [req.user.user_id, title, content], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to create notice" });
    }

    res.status(201).json({ message: "Notice created successfully" });
  });
};

exports.getNotices = (req, res) => {
  const sql = "SELECT * FROM notices ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch notices" });
    }

    res.status(200).json(result);
  });
};