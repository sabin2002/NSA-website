const db = require("../config/db");

// Get all users
exports.getUsers = (req, res) => {
  const sql = `
    SELECT 
      user_id,
      student_id,
      role,
      name,
      email,
      ph_number,
      nationality,
      department,
      major,
      enrollment_year,
      created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch users" });
    }

    res.status(200).json(result);
  });
};

// Get logged-in user's profile
exports.getProfile = (req, res) => {
  const sql = `
    SELECT
      user_id,
      student_id,
      name,
      email,
      ph_number,
      nationality,
      department,
      major,
      enrollment_year,
      role
    FROM users
    WHERE user_id = ?
  `;

  db.query(sql, [req.user.user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch profile" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result[0]);
  });
};

// Update user role
exports.updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const sql = `
    UPDATE users
    SET role = ?
    WHERE user_id = ?
  `;

  db.query(sql, [role, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to update user role" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated successfully" });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE user_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};