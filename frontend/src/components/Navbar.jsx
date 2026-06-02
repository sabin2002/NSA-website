import { Link, useNavigate } from "react-router-dom";
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
      <div className="navbar-logo">
        <h2>NSA</h2>
      </div>

      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/notices">Notices</Link>
        <Link to="/surveys">Surveys</Link>

        {user && <Link to="/profile">Profile</Link>}

        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/participants">Event Participants</Link>
            <Link to="/admin/job-applications">Job Applications</Link>
            <Link to="/budget">Budget</Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="logout-btn-nav" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;