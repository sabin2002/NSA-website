import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Home.css";


function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [notices, setNotices] = useState([]);
  const [surveys, setSurveys] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [eventsRes, jobsRes, noticesRes, surveysRes] = await Promise.all([
        API.get("/events"),
        API.get("/jobs"),
        API.get("/notices"),
        API.get("/surveys"),
      ]);

      setEvents(eventsRes.data.slice(0, 2));
      setJobs(jobsRes.data.slice(0, 3));
      setNotices(noticesRes.data.slice(0, 4));
      setSurveys(surveysRes.data.slice(0, 3));
    } catch (error) {
      console.log("Failed to load home data", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const formatDate = (date) => {
    if (!date) return "Date TBA";
    return new Date(date).toLocaleDateString();
  };

  const getMonth = (date) => {
    if (!date) return "TBA";
    return new Date(date)
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
  };

  const getDay = (date) => {
    if (!date) return "";
    return new Date(date).getDate();
  };

  return (
    <div className="home-page">
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>NEPALESE</h1>
          <h2>Student Association</h2>
          <p>
            {user
              ? `Welcome, ${user.name}. Connecting Students in Korea 🇰🇷 🇳🇵`
              : "Connecting Students in Korea 🇰🇷 🇳🇵"}
          </p>
          <div>
            {!user && (
              <button onClick={() => navigate("/register")}>Join NSA</button>
            )}
            <button className="blue" onClick={() => navigate("/events")}>
              View Events
            </button>
          </div>
        </div>
      </section>

      <section className="cards-section">
        <div className="info-card">
          <div className="card-title">
            <h3>Upcoming Events</h3>
            <span onClick={() => navigate("/events")}>View All</span>
          </div>

          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event) => (
              <div className="event-item" key={event.event_id}>
                <div className="date-box red">
                  {getMonth(event.event_date)}
                  <br />
                  <b>{getDay(event.event_date)}</b>
                </div>
                <div>
                  <h4>{event.title}</h4>
                  <p>
                    {formatDate(event.event_date)} ·{" "}
                    {event.event_time || "Time TBA"}
                  </p>
                  <p>{event.location || "Location TBA"}</p>
                </div>
              </div>
            ))
          )}

          <button className="outline-btn" onClick={() => navigate("/events")}>
            View All Events
          </button>
        </div>

        <div className="info-card">
          <div className="card-title">
            <h3>Latest Jobs</h3>
            <span onClick={() => navigate("/jobs")}>View All</span>
          </div>

          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <div className="job-item" key={job.job_id}>
                <div>
                  <h4>{job.title}</h4>
                  <p>{job.location || "Location TBA"}</p>
                </div>
                <span>{job.job_type || "Job"}</span>
              </div>
            ))
          )}

          <button className="outline-btn" onClick={() => navigate("/jobs")}>
            View All Jobs
          </button>
        </div>

        <div className="info-card">
          <div className="card-title">
            <h3>Latest Announcements</h3>
            <span onClick={() => navigate("/notices")}>View All</span>
          </div>

          {notices.length === 0 ? (
            <p>No announcements available.</p>
          ) : (
            notices.map((notice) => (
              <div className="notice-item" key={notice.notice_id}>
                📢 {notice.title}
              </div>
            ))
          )}

          <button className="outline-btn" onClick={() => navigate("/notices")}>
            View All Announcements
          </button>
        </div>

        <div className="info-card">
          <div className="card-title">
            <h3>Active Surveys</h3>
            <span onClick={() => navigate("/surveys")}>View All</span>
          </div>

          {surveys.length === 0 ? (
            <p>No surveys available.</p>
          ) : (
            surveys.map((survey) => (
              <div className="notice-item" key={survey.survey_id}>
                📋 {survey.title}
              </div>
            ))
          )}

          <button className="outline-btn" onClick={() => navigate("/surveys")}>
            Take Survey
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;