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
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Admin",
    role: "Admin",
  };

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
        <button>
          <FaCalendarAlt /> Events
        </button>
        <button>
          <FaBullhorn /> Notices
        </button>
        <button>
          <FaBriefcase /> Jobs
        </button>
        <button>
          <FaPoll /> Surveys
        </button>
        <button>
          <FaWallet /> Budget
        </button>
        <button>
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
              <h3>8</h3>
              <p>Total Events</p>
            </div>
          </div>

          <div className="stat-card blue">
            <FaBriefcase />
            <div>
              <h3>12</h3>
              <p>Job Posts</p>
            </div>
          </div>

          <div className="stat-card green">
            <FaBullhorn />
            <div>
              <h3>6</h3>
              <p>Notices</p>
            </div>
          </div>

          <div className="stat-card purple">
            <FaPoll />
            <div>
              <h3>4</h3>
              <p>Surveys</p>
            </div>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="management-card">
            <h2>Quick Management</h2>

            <div className="management-grid">
              <button>
                <FaCalendarAlt /> Create Event
              </button>
              <button>
                <FaBullhorn /> Post Notice
              </button>
              <button>
                <FaBriefcase /> Add Job
              </button>
              <button>
                <FaPoll /> Create Survey
              </button>
              <button>
                <FaWallet /> Add Budget Record
              </button>
              <button>
                <FaUsers /> Manage Users
              </button>
            </div>
          </div>

          <div className="activity-card">
            <h2>Recent Activity</h2>

            <div className="activity-item">
              <span>📢</span>
              <div>
                <h4>New notice posted</h4>
                <p>Fingerprinting Registration notice was added.</p>
              </div>
            </div>

            <div className="activity-item">
              <span>💼</span>
              <div>
                <h4>Job listing created</h4>
                <p>Part-time job opportunity was posted.</p>
              </div>
            </div>

            <div className="activity-item">
              <span>📅</span>
              <div>
                <h4>Event updated</h4>
                <p>Sports Day schedule was modified.</p>
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
                <td>Create and manage upcoming events</td>
                <td><span className="status progress">In Progress</span></td>
                <td>High</td>
              </tr>
              <tr>
                <td>Jobs</td>
                <td>Post job opportunities</td>
                <td><span className="status progress">In Progress</span></td>
                <td>High</td>
              </tr>
              <tr>
                <td>Surveys</td>
                <td>Collect student feedback</td>
                <td><span className="status pending">Pending</span></td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>Budget</td>
                <td>Maintain financial transparency</td>
                <td><span className="status pending">Pending</span></td>
                <td>Medium</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;