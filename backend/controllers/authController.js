const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      student_id,
      role,
      name,
      email,
      password,
      ph_number,
      nationality,
      department,
      major,
      enrollment_year,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users
      (student_id, role, name, email, pass_hash, ph_number, nationality, department, major, enrollment_year)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        student_id,
        role,
        name,
        email,
        hashedPassword,
        ph_number,
        nationality,
        department,
        major,
        enrollment_year,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Registration failed",
          });
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};