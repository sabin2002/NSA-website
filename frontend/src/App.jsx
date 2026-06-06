import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import Notices from "./pages/Notices";
import About from "./pages/About";
import Events from "./pages/Events";
import Surveys from "./pages/Surveys";
import AdminEvents from "./pages/AdminEvents";
import AdminNotices from "./pages/AdminNotices";
import AdminJobs from "./pages/AdminJobs";
import AdminSurveys from "./pages/AdminSurveys";
import AdminUsers from "./pages/AdminUsers";
import AdminSurveyResponses from "./pages/AdminSurveyResponses";
import Budget from "./pages/Budget";
import AdminParticipants from "./pages/AdminParticipants";
import Profile from "./pages/Profile";
import AdminJobApplications from "./pages/AdminJobApplications";
import Resources from "./pages/Resources";
import AdminResources from "./pages/AdminResources";

import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import "./App.css";

function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      {!hideLayout && <Navbar />}

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/notices"
            element={
              <AdminRoute>
                <AdminNotices />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <AdminRoute>
                <AdminJobs />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/job-applications"
            element={
              <AdminRoute>
                <AdminJobApplications />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/surveys"
            element={
              <AdminRoute>
                <AdminSurveys />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/survey-responses"
            element={
              <AdminRoute>
                <AdminSurveyResponses />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/participants"
            element={
              <AdminRoute>
                <AdminParticipants />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/resources"
            element={
              <AdminRoute>
                <AdminResources />
              </AdminRoute>
            }
          />

          <Route
            path="/budget"
            element={
              <AdminRoute>
                <Budget />
              </AdminRoute>
            }
          />
        </Routes>
       
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;