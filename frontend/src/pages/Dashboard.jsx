import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaBullhorn,
  FaBriefcase,
  FaPoll,
  FaUsers,
  FaWallet,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import API from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    notices: 0,
    jobs: 0,
    surveys: 0,
  });

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Admin",
    role: "Admin",
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.log("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <h2>NSA</h2>
          <p>Admin Panel</p>
        </div>

        <button onClick={() => navigate("/home")}>
          <FaHome /> Home
        </button>

        <button onClick={() => navigate("/admin/events")}>
          <FaCalendarAlt /> Events
        </button>

        <button onClick={() => navigate("/admin/notices")}>
          <FaBullhorn /> Notices
        </button>

        <button onClick={() => navigate("/admin/jobs")}>
          <FaBriefcase /> Jobs
        </button>

        <button onClick={() => navigate("/admin/surveys")}>
          <FaPoll /> Surveys
        </button>

        <button onClick={() => navigate("/budget")}>
          <FaWallet /> Budget
        </button>

        <button onClick={() => navigate("/admin/users")}>
          <FaUsers /> Users
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user.name}. Manage the NSA website from here.</p>
          </div>

          <div className="admin-profile">
            <div>
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>
            <div className="avatar">👤</div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card red">
            <FaCalendarAlt />
            <div>
              <h3>{stats.events}</h3>
              <p>Total Events</p>
            </div>
          </div>

          <div className="stat-card blue">
            <FaBriefcase />
            <div>
              <h3>{stats.jobs}</h3>
              <p>Job Posts</p>
            </div>
          </div>

          <div className="stat-card green">
            <FaBullhorn />
            <div>
              <h3>{stats.notices}</h3>
              <p>Notices</p>
            </div>
          </div>

          <div className="stat-card purple">
            <FaPoll />
            <div>
              <h3>{stats.surveys}</h3>
              <p>Surveys</p>
            </div>
          </div>

          <div className="stat-card blue">
            <FaUsers />
            <div>
              <h3>{stats.users}</h3>
              <p>Total Users</p>
            </div>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="management-card">
            <h2>Quick Management</h2>

            <div className="management-grid">
              <button onClick={() => navigate("/admin/events")}>
                <FaCalendarAlt /> Manage Events
              </button>
              <button onClick={() => navigate("/admin/notices")}>
                <FaBullhorn /> Manage Notices
              </button>
              <button onClick={() => navigate("/admin/jobs")}>
                <FaBriefcase /> Manage Jobs
              </button>
              <button onClick={() => navigate("/admin/surveys")}>
                <FaPoll /> Manage Surveys
              </button>
              <button onClick={() => navigate("/budget")}>
                <FaWallet /> Manage Budget
              </button>
              <button onClick={() => navigate("/admin/users")}>
                <FaUsers /> Manage Users
              </button>
            </div>
          </div>

          <div className="activity-card">
            <h2>Project Summary</h2>

            <div className="activity-item">
              <span>✅</span>
              <div>
                <h4>Authentication Completed</h4>
                <p>Register, OTP, login, JWT, and admin authorization are working.</p>
              </div>
            </div>

            <div className="activity-item">
              <span>📊</span>
              <div>
                <h4>Core CRUD Modules Completed</h4>
                <p>Events, Notices, Jobs, Surveys, and Users are connected to MySQL.</p>
              </div>
            </div>

            <div className="activity-item">
              <span>🚀</span>
              <div>
                <h4>Dashboard Statistics Active</h4>
                <p>Dashboard now displays live counts from the database.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="table-section">
          <h2>Admin Tasks Overview</h2>

          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Events</td>
                <td>Create, view, update, and delete events</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>
              <tr>
                <td>Jobs</td>
                <td>Post and manage job opportunities</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>
              <tr>
                <td>Notices</td>
                <td>Publish and manage announcements</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>
              <tr>
                <td>Surveys</td>
                <td>Create and manage student feedback surveys</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>
              <tr>
                <td>Users</td>
                <td>View users, change roles, and delete accounts</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;