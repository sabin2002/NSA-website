import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaCalendarAlt,
  FaBullhorn,
  FaPoll,
  FaInfoCircle,
  FaPlus,
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import "./Surveys.css";

function Surveys() {
  const navigate = useNavigate();

  const surveys = [
    {
      title: "Student Satisfaction Survey",
      description: "Share your feedback about NSA events and student support.",
      deadline: "2026-06-30",
      status: "Open",
      responses: 45,
    },
    {
      title: "Sports Festival Feedback",
      description: "Help us improve future sports activities.",
      deadline: "2026-06-20",
      status: "Open",
      responses: 28,
    },
    {
      title: "Job Support Survey",
      description: "Tell us what kind of job information you need.",
      deadline: "2026-07-05",
      status: "Open",
      responses: 16,
    },
  ];

  return (
    <div className="surveys-page">
      <nav className="surveys-nav">
        <div className="surveys-logo" onClick={() => navigate("/home")}>
          <h2>NEPALESE</h2>
          <span>Student Association</span>
        </div>

        <div className="surveys-menu">
          <button onClick={() => navigate("/home")}><FaHome /> Home</button>
          <button onClick={() => navigate("/jobs")}><FaBriefcase /> Jobs</button>
          <button onClick={() => navigate("/events")}><FaCalendarAlt /> Events</button>
          <button onClick={() => navigate("/notices")}><FaBullhorn /> Announcements</button>
          <button className="active"><FaPoll /> Surveys</button>
          <button onClick={() => navigate("/about")}><FaInfoCircle /> About Us</button>
        </div>
      </nav>

      <section className="surveys-hero">
        <h1>Surveys</h1>
        <div className="surveys-divider"></div>
        <p>Participate in surveys and help NSA improve student services.</p>
      </section>

      <main className="surveys-layout">
        <section className="surveys-list">
          <div className="surveys-header">
            <div>
              <h2>Available Surveys</h2>
              <p>Choose a survey and submit your response.</p>
            </div>

            <button className="create-survey-btn">
              <FaPlus /> Create Survey
            </button>
          </div>

          {surveys.map((survey, index) => (
            <div className="survey-card" key={index}>
              <div className="survey-icon">
                <FaPoll />
              </div>

              <div className="survey-info">
                <h3>{survey.title}</h3>
                <p>{survey.description}</p>

                <div className="survey-meta">
                  <span>Deadline: {survey.deadline}</span>
                  <span>Responses: {survey.responses}</span>
                  <span className="open-status">{survey.status}</span>
                </div>
              </div>

              <button className="submit-survey-btn">
                <FaPaperPlane /> Submit
              </button>
            </div>
          ))}
        </section>

        <aside className="survey-form-card">
          <h2>Submit Survey Response</h2>

          <label>Select Survey</label>
          <select>
            <option>Student Satisfaction Survey</option>
            <option>Sports Festival Feedback</option>
            <option>Job Support Survey</option>
          </select>

          <label>How satisfied are you?</label>
          <select>
            <option>Very Satisfied</option>
            <option>Satisfied</option>
            <option>Neutral</option>
            <option>Unsatisfied</option>
          </select>

          <label>Your Feedback</label>
          <textarea placeholder="Write your feedback here..."></textarea>

          <button>Submit Response</button>
        </aside>
      </main>

      <footer className="surveys-footer">
        <div>
          <h3>Nepalese Student Association (NSA)</h3>
          <p>Connecting Students in Korea 🇰🇷 🇳🇵</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home | Jobs | Events | Announcements | Surveys | About Us</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="footer-icons">
            <FaFacebook />
            <FaInstagram />
            <FaYoutube />
            <FaEnvelope />
          </div>
        </div>

        <div>
          <p>© 2026 Nepalese Student Association.</p>
          <p>All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Surveys;