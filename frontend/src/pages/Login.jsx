import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-banner">
        <div className="banner-overlay">
          <h1>NEPALESE</h1>
          <h2>Student Association</h2>
          <p>Connecting Students in Korea 🇰🇷 🇳🇵</p>
        </div>
      </div>

      <div className="login-card">
        <div className="login-left">
          <h2>Welcome Back!</h2>

          <p>
            Login to your NSA account and access events, jobs,
            announcements, surveys, and resources.
          </p>

          <img
            src="C:\Users\User\Desktop\Project\NSA-website\frontend\src\pages\images\logo.png"
            alt="NSA"
            className="welcome-logo"
          />

          <h3>Stay Connected</h3>

          <p>
            Empowering Nepalese students through information,
            opportunities, and community engagement.
          </p>
        </div>

        <div className="login-right">
          <h2>Login To Your Account</h2>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              Login
            </button>
          </form>
<p className="text-end mt-2">
  <a href="/forgot-password">Forgot Password?</a>
</p>
          <p className="register-text">
            Don't have an account?
            <Link to="/register"> Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;