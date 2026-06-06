import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../api/axios";
import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await API.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-left">
          <h1>Reset Password</h1>
          <p>
            Enter the OTP sent to your email and create a new secure password.
          </p>
          <div className="reset-icon">🔐</div>
          <p className="small-text">
            OTP expires in 5 minutes. Please check your email inbox or spam folder.
          </p>
        </div>

        <form className="reset-form" onSubmit={handleSubmit}>
          <h2>Create New Password</h2>

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>OTP Code</label>
          <input
            type="text"
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>

          <p>
            Remember your password? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;