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
  FaFilePdf,
  FaClipboardList,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
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

  const [budget, setBudget] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Admin",
    role: "admin",
  };

  useEffect(() => {
    fetchStats();
    fetchBudget();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log("Failed to fetch dashboard stats", error);
    }
  };

  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudget(res.data);
    } catch (error) {
      console.log("Failed to fetch budget", error);
    }
  };

  const totalIncome = budget
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = budget
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Events", value: stats.events },
    { name: "Notices", value: stats.notices },
    { name: "Jobs", value: stats.jobs },
    { name: "Surveys", value: stats.surveys },
  ];

  const budgetData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const COLORS = ["#1f5bbd", "#c52d2d"];

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

        <button onClick={() => navigate("/admin/dashboard")}>
          <FaHome /> Dashboard
        </button>

        <button onClick={() => navigate("/home")}>
          <FaHome /> Website Home
        </button>

        <button onClick={() => navigate("/admin/events")}>
          <FaCalendarAlt /> Events
        </button>

        <button onClick={() => navigate("/admin/participants")}>
          <FaUsers /> Event Participants
        </button>

        <button onClick={() => navigate("/admin/notices")}>
          <FaBullhorn /> Notices
        </button>

        <button onClick={() => navigate("/admin/jobs")}>
          <FaBriefcase /> Jobs
        </button>

        <button onClick={() => navigate("/admin/job-applications")}>
          <FaClipboardList /> Job Applications
        </button>

        <button onClick={() => navigate("/admin/surveys")}>
          <FaPoll /> Surveys
        </button>

        <button onClick={() => navigate("/admin/survey-responses")}>
          <FaClipboardList /> Survey Responses
        </button>

        <button onClick={() => navigate("/admin/resources")}>
          <FaFilePdf /> Resources
        </button>

        <button onClick={() => navigate("/admin/users")}>
          <FaUsers /> Users
        </button>

        <button onClick={() => navigate("/budget")}>
          <FaWallet /> Budget
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

        <section className="charts-section">
          <div className="chart-card">
            <h2>System Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#8b1414" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>Budget Summary</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="budget-chart-summary">
              <p>Income: ₩ {totalIncome.toLocaleString()}</p>
              <p>Expense: ₩ {totalExpense.toLocaleString()}</p>
              <p>Balance: ₩ {(totalIncome - totalExpense).toLocaleString()}</p>
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

              <button onClick={() => navigate("/admin/participants")}>
                <FaUsers /> Event Participants
              </button>

              <button onClick={() => navigate("/admin/notices")}>
                <FaBullhorn /> Manage Notices
              </button>

              <button onClick={() => navigate("/admin/jobs")}>
                <FaBriefcase /> Manage Jobs
              </button>

              <button onClick={() => navigate("/admin/job-applications")}>
                <FaClipboardList /> Job Applications
              </button>

              <button onClick={() => navigate("/admin/surveys")}>
                <FaPoll /> Manage Surveys
              </button>

              <button onClick={() => navigate("/admin/survey-responses")}>
                <FaClipboardList /> Survey Responses
              </button>

              <button onClick={() => navigate("/admin/resources")}>
                <FaFilePdf /> Manage Resources
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
                <p>Events, Notices, Jobs, Surveys, Users, Resources, and Budget are connected to MySQL.</p>
              </div>
            </div>

            <div className="activity-item">
              <span>🚀</span>
              <div>
                <h4>Student Participation Features Active</h4>
                <p>Students can register for events, apply for jobs, submit surveys, and download resources.</p>
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
                <td>Create, view, update, delete, and view registered participants</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>

              <tr>
                <td>Jobs</td>
                <td>Post jobs and view student job applications</td>
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
                <td>Create surveys and view submitted responses</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>

              <tr>
                <td>Resources</td>
                <td>Upload, edit, delete, and share files with students</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>

              <tr>
                <td>Users</td>
                <td>View users, change roles, and delete accounts</td>
                <td><span className="status progress">Completed</span></td>
                <td>High</td>
              </tr>

              <tr>
                <td>Budget</td>
                <td>Manage income, expenses, and balance</td>
                <td><span className="status progress">Completed</span></td>
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