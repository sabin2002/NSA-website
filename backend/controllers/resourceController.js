const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// Get all resources
exports.getResources = (req, res) => {
  const sql = "SELECT * FROM resources ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch resources" });
    }

    res.status(200).json(result);
  });
};

// Create resource
exports.createResource = (req, res) => {
  const { title, description, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  const fileName = req.file.originalname;
  const filePath = `/uploads/resources/${req.file.filename}`;

  const sql = `
    INSERT INTO resources
    (title, description, category, file_name, file_path)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, category, fileName, filePath],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to upload resource" });
      }

      res.status(201).json({ message: "Resource uploaded successfully" });
    }
  );
};

// Update resource
exports.updateResource = (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  if (req.file) {
    const getSql = "SELECT file_path FROM resources WHERE resource_id = ?";

    db.query(getSql, [id], (getErr, getResult) => {
      if (getErr) {
        console.log(getErr);
        return res.status(500).json({ message: "Failed to find resource" });
      }

      if (getResult.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }

      const oldFilePath = getResult[0].file_path;

      if (oldFilePath) {
        const fullOldPath = path.join(__dirname, "..", oldFilePath);

        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }

      const newFileName = req.file.originalname;
      const newFilePath = `/uploads/resources/${req.file.filename}`;

      const updateSql = `
        UPDATE resources
        SET title = ?, description = ?, category = ?, file_name = ?, file_path = ?
        WHERE resource_id = ?
      `;

      db.query(
        updateSql,
        [title, description, category, newFileName, newFilePath, id],
        (updateErr) => {
          if (updateErr) {
            console.log(updateErr);
            return res.status(500).json({ message: "Failed to update resource" });
          }

          res.status(200).json({ message: "Resource updated successfully" });
        }
      );
    });
  } else {
    const updateSql = `
      UPDATE resources
      SET title = ?, description = ?, category = ?
      WHERE resource_id = ?
    `;

    db.query(updateSql, [title, description, category, id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update resource" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }

      res.status(200).json({ message: "Resource updated successfully" });
    });
  }
};

// Delete resource
exports.deleteResource = (req, res) => {
  const { id } = req.params;

  const getSql = "SELECT file_path FROM resources WHERE resource_id = ?";

  db.query(getSql, [id], (getErr, getResult) => {
    if (getErr) {
      console.log(getErr);
      return res.status(500).json({ message: "Failed to find resource" });
    }

    if (getResult.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const filePath = getResult[0].file_path;

    const deleteSql = "DELETE FROM resources WHERE resource_id = ?";

    db.query(deleteSql, [id], (deleteErr) => {
      if (deleteErr) {
        console.log(deleteErr);
        return res.status(500).json({ message: "Failed to delete resource" });
      }

      if (filePath) {
        const fullPath = path.join(__dirname, "..", filePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }

      res.status(200).json({ message: "Resource deleted successfully" });
    });
  });
};