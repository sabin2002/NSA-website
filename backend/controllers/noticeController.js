// Update Notice
exports.updateNotice = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const sql = `
    UPDATE notices
    SET title = ?, content = ?
    WHERE notice_id = ?
  `;

  db.query(sql, [title, content, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to update notice" });
    }

    res.status(200).json({ message: "Notice updated successfully" });
  });
};

// Delete Notice
exports.deleteNotice = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM notices WHERE notice_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete notice" });
    }

    res.status(200).json({ message: "Notice deleted successfully" });
  });
};