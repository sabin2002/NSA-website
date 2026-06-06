import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/forgot-password", { email });

      alert("OTP sent to your email");

      navigate("/reset-password", {
        state: { email },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mt-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-primary mt-3">
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;