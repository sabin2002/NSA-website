import { BrowserRouter, Routes, Route } from "react-router-dom";

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





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/surveys" element={<Surveys />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/notices" element={<AdminNotices />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/surveys" element={<AdminSurveys />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/survey-responses" element={<AdminSurveyResponses />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;