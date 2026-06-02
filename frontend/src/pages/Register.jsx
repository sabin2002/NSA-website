import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [otpVerified, setOtpVerified] = useState(false);

  const [otpData, setOtpData] = useState({ email: "", otp: "" });

  const [formData, setFormData] = useState({
    student_id: "",
    role: "Student",
    name: "",
    email: "",
    password: "",
    ph_number: "",
    nationality: "",
    department: "",
    major: "",
    enrollment_year: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      setOtpData({ ...otpData, email: e.target.value });
    }
  };

  const handleSendOtp = async () => {
    try {
      await API.post("/auth/send-otp", { email: otpData.email });
      alert("OTP sent to email");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await API.post("/auth/verify-otp", otpData);
      setOtpVerified(true);
      alert("OTP verified successfully");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      return alert("Please verify OTP first");
    }

    try {
      await API.post("/auth/register", formData);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">

      <section className="hero">
        <h1>Create Your Account</h1>
        <p>Join the Nepalese Student Association and connect with students across Korea.</p>

        <div className="register-card">
          <div className="info-panel">
            <div className="icon">🎓</div>
            <h3>Be a Part of NSA</h3>
            <p>
              Create an account to access resources, apply for jobs, join events,
              and stay updated with announcements.
            </p>

            <ul>
              <li>📖 Access student resources</li>
              <li>📅 Join events and programs</li>
              <li>💼 Apply for jobs and opportunities</li>
              <li>🔔 Get important announcements</li>
            </ul>
          </div>

          <form onSubmit={handleRegister} className="form-panel">
            <h3>Registration Form</h3>

            <div className="grid">
              <input name="name" placeholder="Full Name *" onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email Address *" onChange={handleChange} required />

              <input name="password" type="password" placeholder="Password *" onChange={handleChange} required />
              <input name="student_id" placeholder="Student ID *" onChange={handleChange} required />

              <input name="ph_number" placeholder="Phone Number" onChange={handleChange} required/>
              <input name="nationality" placeholder="Nationality" onChange={handleChange} required/>

              <input name="department" placeholder="Department" onChange={handleChange} required/>
              <input name="major" placeholder="Course / Major" onChange={handleChange} required/>

              <input name="enrollment_year" type="number" placeholder="Enrollment Year" onChange={handleChange} required/>
              {/* <select name="role" onChange={handleChange}>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select> */}
            </div>

            <div className="otp-box">
              <button type="button" onClick={handleSendOtp}>Send OTP</button>
              <input
                placeholder="Enter OTP"
                onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })}
              />
              <button type="button" onClick={handleVerifyOtp}>
                {otpVerified ? "Verified ✅" : "Verify OTP"}
              </button>
            </div>

            <label className="terms">
              <input type="checkbox" required /> I agree to the Terms & Conditions and Privacy Policy
            </label>

            <button className="create-btn">Create Account</button>

            <p className="login-link">
              Already have an account? <span onClick={() => navigate("/")}>Login</span>
            </p>
          </form>
        </div>
      </section>

      
    </div>
  );
}

export default Register;