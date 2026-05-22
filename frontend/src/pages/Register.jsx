import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [otpVerified, setOtpVerified] = useState(false);

  const [otpData, setOtpData] = useState({
    email: "",
    otp: "",
  });

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

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Sync email for OTP
    if (e.target.name === "email") {
      setOtpData({
        ...otpData,
        email: e.target.value,
      });
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    try {
      await API.post("/auth/send-otp", {
        email: otpData.email,
      });

      alert("OTP sent to email");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      await API.post("/auth/verify-otp", otpData);

      setOtpVerified(true);

      alert("OTP verified successfully");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  // Register
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
    <div className="container mt-5">
      <h2>NSA Website Registration</h2>

      <form
        onSubmit={handleRegister}
        className="mt-4"
        style={{ maxWidth: "600px" }}
      >
        <input
          className="form-control mb-3"
          name="student_id"
          placeholder="Student ID"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <button
          type="button"
          className="btn btn-warning mb-3"
          onClick={handleSendOtp}
        >
          Send OTP
        </button>

        <input
          className="form-control mb-3"
          placeholder="Enter OTP"
          onChange={(e) =>
            setOtpData({
              ...otpData,
              otp: e.target.value,
            })
          }
        />

        <button
          type="button"
          className="btn btn-info mb-3 ms-2"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>

        <input
          className="form-control mb-3"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="ph_number"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="nationality"
          placeholder="Nationality"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="department"
          placeholder="Department"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="major"
          placeholder="Major"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="enrollment_year"
          type="number"
          placeholder="Enrollment Year"
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;