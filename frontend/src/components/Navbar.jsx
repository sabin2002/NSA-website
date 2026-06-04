import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaCalendarAlt,
  FaBullhorn,
  FaBookOpen,
  FaClipboardList,
  FaInfoCircle,
  FaUserCircle,
} from "react-icons/fa";
import logo from "../assets/nsa-logo.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="NSA Logo" />
      </div>

      <div className="navbar-menu">
        <Link to="/"><FaHome /> Home</Link>
        <Link to="/jobs"><FaBriefcase /> Jobs</Link>
        <Link to="/events"><FaCalendarAlt /> Events</Link>
        <Link to="/notices"><FaBullhorn /> Announcements</Link>
        <Link to="/resources"><FaBookOpen /> Resources</Link>
        <Link to="/surveys"><FaClipboardList /> Surveys</Link>
        <Link to="/about"><FaInfoCircle /> About Us</Link>
      </div>

      <div className="navbar-auth">
        {!user ? (
          <>
            <Link className="login-btn" to="/login">Login</Link>
            <Link className="register-btn" to="/register">Register</Link>
          </>
        ) : (
          <div className="user-dropdown">
            <button className="user-btn">
              <FaUserCircle /> {user.role === "admin" ? "Admin" : "Profile"}
            </button>

            <div className="dropdown-menu">
              <Link to="/profile">My Profile</Link>

              {user.role === "admin" && (
                <>
                  <Link to="/admin/dashboard">Dashboard</Link>
                  <Link to="/admin/users">Users</Link>
                  <Link to="/admin/participants">Participants</Link>
                  <Link to="/admin/job-applications">Job Applications</Link>
                  <Link to="/budget">Budget</Link>
                  <Link to="/admin/resources">Manage Resources</Link>
                </>
              )}

              <button onClick={logout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;