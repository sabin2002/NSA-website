const sendEmail = require("../utils/sendEmail");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
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

    const otpSql = `
      SELECT * FROM otp_verifications
      WHERE email = ? AND is_verified = TRUE
      ORDER BY created_at DESC
      LIMIT 1
    `;

    db.query(otpSql, [email], async (otpErr, otpResult) => {
      if (otpErr) {
        return res.status(500).json({ message: "OTP check failed" });
      }

      if (otpResult.length === 0) {
        return res.status(400).json({
          message: "Please verify OTP before registration",
        });
      }

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
          role || "student",
          name,
          email,
          hashedPassword,
          ph_number,
          nationality,
          department,
          major,
          enrollment_year,
        ],
        (err) => {
          if (err) {
            console.log(err);

            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({
                message: "Email or Student ID already exists",
              });
            }

            return res.status(500).json({
              message: "Registration failed",
            });
          }

          res.status(201).json({
            message: "User registered successfully",
          });
        }
      );
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.pass_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        student_id: user.student_id,
        name: user.name,
        email: user.email,
        role: user.role,
        ph_number: user.ph_number,
        nationality: user.nationality,
        department: user.department,
        major: user.major,
        enrollment_year: user.enrollment_year,
      },
    });
  });
};

// Send OTP for registration
exports.sendOtp = (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const deleteOldOtpSql = `
    DELETE FROM otp_verifications
    WHERE email = ?
  `;

  db.query(deleteOldOtpSql, [email], (deleteErr) => {
    if (deleteErr) {
      console.log(deleteErr);
      return res.status(500).json({ message: "Failed to clear old OTP" });
    }

    const sql = `
      INSERT INTO otp_verifications (email, otp_code, expires_at, is_verified)
      VALUES (?, ?, ?, FALSE)
    `;

    db.query(sql, [email, otp, expiresAt], async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to save OTP" });
      }

      try {
        await sendEmail(
          email,
          "NSA Website Registration OTP",
          `Your NSA Website registration OTP code is ${otp}. It will expire in 5 minutes.`
        );

        res.status(200).json({ message: "OTP sent to email" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to send OTP email" });
      }
    });
  });
};

// Verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  const sql = `
    SELECT * FROM otp_verifications
    WHERE email = ? AND otp_code = ? AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const updateSql = `
      UPDATE otp_verifications
      SET is_verified = TRUE
      WHERE otp_id = ?
    `;

    db.query(updateSql, [result[0].otp_id], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ message: "Failed to verify OTP" });
      }

      res.status(200).json({ message: "OTP verified successfully" });
    });
  });
};

// Send OTP for forgot password
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  const checkUserSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkUserSql, [email], (userErr, userResult) => {
    if (userErr) {
      return res.status(500).json({ message: "Server error" });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const deleteOldOtpSql = `
      DELETE FROM otp_verifications
      WHERE email = ?
    `;

    db.query(deleteOldOtpSql, [email], (deleteErr) => {
      if (deleteErr) {
        console.log(deleteErr);
        return res.status(500).json({ message: "Failed to clear old OTP" });
      }

      const sql = `
        INSERT INTO otp_verifications (email, otp_code, expires_at, is_verified)
        VALUES (?, ?, ?, FALSE)
      `;

      db.query(sql, [email, otp, expiresAt], async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Failed to save OTP" });
        }

        try {
          await sendEmail(
            email,
            "NSA Website Password Reset OTP",
            `Your NSA Website password reset OTP is ${otp}. It will expire in 5 minutes.`
          );

          res.status(200).json({
            message: "Password reset OTP sent to email",
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Failed to send OTP email" });
        }
      });
    });
  });
};

// Reset password using OTP
exports.resetPassword = (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      message: "Email, OTP, and new password are required",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  const otpSql = `
    SELECT * FROM otp_verifications
    WHERE email = ?
    AND otp_code = ?
    AND expires_at > NOW()
    AND is_verified = FALSE
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(otpSql, [email, otp], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateSql = `
      UPDATE users
      SET pass_hash = ?
      WHERE email = ?
    `;

    db.query(updateSql, [hashedPassword, email], (updateErr) => {
      if (updateErr) {
        console.log(updateErr);
        return res.status(500).json({ message: "Failed to reset password" });
      }

      const markOtpSql = `
        UPDATE otp_verifications
        SET is_verified = TRUE
        WHERE otp_id = ?
      `;

      db.query(markOtpSql, [result[0].otp_id], (markErr) => {
        if (markErr) {
          console.log(markErr);
        }

        res.status(200).json({
          message: "Password reset successfully",
        });
      });
    });
  });
};