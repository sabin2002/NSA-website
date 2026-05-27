import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <nav className="home-nav">
        <div className="brand">
          <h2>NEPALESE</h2>
          <span>Student Association</span>
        </div>

        <div className="nav-menu">
          <a>🏠 Home</a>
          <a onClick={() => navigate("/jobs")}>💼 Jobs</a>
          <a onClick={() => navigate("/events")}>📅 Events</a>
          <a onClick={() => navigate("/notices")}>📢 Announcements</a>
          <a>📖 Resources</a>
          <a>ⓘ About Us</a>
          <button onClick={() => navigate("/")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>NEPALESE</h1>
          <h2>Student Association</h2>
          <p>Connecting Students in Korea 🇰🇷 🇳🇵</p>
          <div>
            <button onClick={() => navigate("/register")}>Join NSA</button>
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
            <span>View All</span>
          </div>

          <div className="event-item">
            <div className="date-box red">APR<br /><b>15</b></div>
            <div>
              <h4>Cultural Night Program</h4>
              <p>April 15, 2026 · 6:00 PM</p>
              <p>Seoul, Korea</p>
            </div>
          </div>

          <div className="event-item">
            <div className="date-box blue-bg">APR<br /><b>22</b></div>
            <div>
              <h4>Sports Day</h4>
              <p>April 22, 2026 · 9:00 AM</p>
              <p>Han River Park</p>
            </div>
          </div>

          <button className="outline-btn">View All Events</button>
        </div>

        <div className="info-card">
          <div className="card-title">
            <h3>Latest Jobs</h3>
            <span>View All</span>
          </div>

          <div className="job-item">
            <div>
              <h4>Convenience Store Staff</h4>
              <p>Naju, Korea</p>
            </div>
            <span>Part-time</span>
          </div>

          <div className="job-item">
            <div>
              <h4>Restaurant Kitchen Helper</h4>
              <p>Seoul, Korea</p>
            </div>
            <span>Part-time</span>
          </div>

          <div className="job-item">
            <div>
              <h4>Tutor (Nepali/English)</h4>
              <p>Online</p>
            </div>
            <span>Freelance</span>
          </div>

          <button className="outline-btn">View All Jobs</button>
        </div>

        <div className="info-card">
          <div className="card-title">
            <h3>Latest Announcements</h3>
            <span>View All</span>
          </div>

          <div className="notice-item">📄 Fingerprinting Registration</div>
          <div className="notice-item">🎓 Scholarship Application Open</div>
          <div className="notice-item">📢 General Meeting Notice</div>
          <div className="notice-item">🩸 Blood Donation Program</div>

          <button className="outline-btn">View All Announcements</button>
        </div>

        <div className="login-card">
          <h3>Login to Your Account</h3>

          <label>Email Address</label>
          <input placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="login-options">
            <label><input type="checkbox" /> Remember me</label>
            <span>Forgot Password?</span>
          </div>

          <button onClick={() => navigate("/")}>Login</button>

          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register here</span>
          </p>
        </div>
      </section>

      <footer className="home-footer">
        <div>
          <h3>About Nepalese Student Association</h3>
          <p>
            NSA supports Nepalese students in Korea by connecting,
            empowering, and growing together.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Visa Information</p>
          <p>Korean Language Classes</p>
        </div>

        <div>
          <h3>Connect With Us</h3>
          <p>Facebook · Instagram · YouTube · Email</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;