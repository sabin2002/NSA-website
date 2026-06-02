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

import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/surveys" element={<Surveys />} />

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
          path="/admin/surveys"
          element={
            <AdminRoute>
              <AdminSurveys />
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
          path="/admin/survey-responses"
          element={
            <AdminRoute>
              <AdminSurveyResponses />
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
          path="/budget"
          element={
            <AdminRoute>
              <Budget />
            </AdminRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
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