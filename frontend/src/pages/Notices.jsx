import { useNavigate } from "react-router-dom";
import {
  FaHome, FaBriefcase, FaCalendarAlt, FaBullhorn, FaBookOpen,
  FaInfoCircle, FaSearch, FaFilter, FaUndo, FaFacebook,
  FaInstagram, FaYoutube, FaEnvelope, FaGraduationCap, FaFileAlt
} from "react-icons/fa";
import "./Notices.css";

function Notices() {
  const navigate = useNavigate();

  const notices = [
    {
      title: "Fingerprinting Registration",
      category: "General",
      text: "Mandatory for all new students. Please complete your fingerprinting registration as per the schedule.",
      date: "April 10, 2026",
      by: "Admin",
      icon: <FaBullhorn />,
      color: "red",
    },
    {
      title: "Scholarship Application Open",
      category: "Scholarship",
      text: "Apply before April 30, 2026. Don't miss this opportunity!",
      date: "April 8, 2026",
      by: "Admin",
      icon: <FaGraduationCap />,
      color: "green",
    },
    {
      title: "General Meeting Notice",
      category: "Notice",
      text: "General meeting will be held on April 20, 2026 at 3:00 PM in the main hall.",
      date: "April 5, 2026",
      by: "Admin",
      icon: <FaFileAlt />,
      color: "blue",
    },
    {
      title: "Cultural Night Program Update",
      category: "Event",
      text: "The Cultural Night Program is confirmed on April 15, 2026. Come and enjoy the performances!",
      date: "April 2, 2026",
      by: "User",
      icon: <FaCalendarAlt />,
      color: "purple",
    },
    {
      title: "Final Exam Routine Published",
      category: "Academic",
      text: "Final exam routine for Spring 2026 has been published. Check the academic section for details.",
      date: "March 30, 2026",
      by: "Admin",
      icon: <FaBookOpen />,
      color: "orange",
    },
    {
      title: "Office Closed on Public Holiday",
      category: "General",
      text: "The NSA office will remain closed on April 14, 2026.",
      date: "March 28, 2026",
      by: "Admin",
      icon: <FaInfoCircle />,
      color: "gray",
    },
  ];

  return (
    <div className="notices-page">
      <nav className="notices-nav">
        <div className="notices-logo" onClick={() => navigate("/home")}>
          <h2>NEPALESE</h2>
          <span>Student Association</span>
        </div>

        <div className="notices-menu">
          <button onClick={() => navigate("/home")}><FaHome /> Home</button>
          <button onClick={() => navigate("/jobs")}><FaBriefcase /> Jobs</button>
          <button onClick={() => navigate("/events")}><FaCalendarAlt /> Events</button>
          <button className="active"><FaBullhorn /> Announcements</button>
          <button><FaBookOpen /> Resources</button>
          <button onClick={() => navigate("/about")}><FaInfoCircle /> About Us</button>
          <button onClick={() => navigate("/")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      <section className="notices-hero">
        <h1>Announcements</h1>
        <div className="notices-divider"></div>
        <p>Stay informed with the latest updates, notices and important information.</p>
      </section>

      <main className="notices-layout">
        <aside className="notice-filter">
          <h3>Filter Announcements</h3>

          <label>Search</label>
          <div className="search-box">
            <input placeholder="Search announcements..." />
            <FaSearch />
          </div>

          <h4>Category</h4>
          <label><input type="checkbox" defaultChecked /> All Categories</label>
          <label><input type="checkbox" /> General</label>
          <label><input type="checkbox" /> Academic</label>
          <label><input type="checkbox" /> Scholarship</label>
          <label><input type="checkbox" /> Event</label>
          <label><input type="checkbox" /> Notice</label>
          <label><input type="checkbox" /> Other</label>

          <h4>Posted By</h4>
          <label><input type="radio" name="posted" defaultChecked /> All</label>
          <label><input type="radio" name="posted" /> Admin</label>
          <label><input type="radio" name="posted" /> User</label>

          <h4>Date</h4>
          <input type="date" />

          <button className="apply-btn"><FaFilter /> Apply Filters</button>
          <button className="clear-btn"><FaUndo /> Clear Filters</button>
        </aside>

        <section className="notice-list">
          <div className="notice-header">
            <h3>All Announcements</h3>
            <span>Showing 1 to 6 of 6 announcements</span>
          </div>

          {notices.map((notice, index) => (
            <div className="notice-row" key={index}>
              <div className={`notice-icon ${notice.color}`}>
                {notice.icon}
              </div>

              <div className="notice-content">
                <h3>{notice.title}</h3>
                <span className={`notice-tag ${notice.color}`}>
                  {notice.category}
                </span>
                <p>{notice.text}</p>
              </div>

              <div className="notice-meta">
                <p>📅 {notice.date}</p>
                <p>By {notice.by}</p>
              </div>

              <button className="details-btn">View Details</button>
            </div>
          ))}

          <div className="notice-pagination">
            <button>‹</button>
            <button className="current">1</button>
            <button>›</button>
          </div>
        </section>
      </main>

      <footer className="notices-footer">
        <div>
          <h3>Nepalese Student Association (NSA)</h3>
          <p>Connecting Students in Korea 🇰🇷 🇳🇵</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home | Jobs | Events | Announcements | Resources | About Us</p>
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

export default Notices;