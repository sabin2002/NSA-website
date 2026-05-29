import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaCalendarAlt,
  FaBullhorn,
  FaBookOpen,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaClock,
  FaFilter,
  FaUndo,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import "./Events.css";

function Events() {
  const navigate = useNavigate();

  const events = [
    {
      title: "Cultural Night Program",
      type: "Cultural",
      date: "APR",
      day: "15",
      time: "Apr 15, 2026 · 6:00 PM",
      location: "Seoul, Korea",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800",
    },
    {
      title: "Sports Day",
      type: "Sports",
      date: "APR",
      day: "22",
      time: "Apr 22, 2026 · 9:00 AM",
      location: "Han River Park",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800",
    },
    {
      title: "Study Abroad Seminar",
      type: "Educational",
      date: "APR",
      day: "29",
      time: "Apr 29, 2026 · 2:00 PM",
      location: "Online (Zoom)",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800",
    },
    {
      title: "Hiking Trip",
      type: "Social",
      date: "MAY",
      day: "05",
      time: "May 5, 2026 · 7:00 AM",
      location: "Bukhansan National Park",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800",
    },
    {
      title: "Blood Donation Program",
      type: "Social",
      date: "MAY",
      day: "12",
      time: "May 12, 2026 · 10:00 AM",
      location: "Seoul Medical Center",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800",
    },
    {
      title: "Nepali Food Festival",
      type: "Cultural",
      date: "MAY",
      day: "18",
      time: "May 18, 2026 · 12:00 PM",
      location: "Ttukseom Hangang Park",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
    },
    {
      title: "Resume Building Workshop",
      type: "Workshop",
      date: "MAY",
      day: "25",
      time: "May 25, 2026 · 1:00 PM",
      location: "Online (Zoom)",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
    },
    {
      title: "Volleyball Tournament",
      type: "Sports",
      date: "JUN",
      day: "02",
      time: "Jun 2, 2026 · 8:00 AM",
      location: "Jamsil Sports Complex",
      image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800",
    },
  ];

  return (
    <div className="events-page">
      <nav className="events-nav">
        <div className="events-logo" onClick={() => navigate("/home")}>
          <h2>NEPALESE</h2>
          <span>Student Association</span>
        </div>

        <div className="events-menu">
          <button onClick={() => navigate("/home")}><FaHome /> Home</button>
          <button onClick={() => navigate("/jobs")}><FaBriefcase /> Jobs</button>
          <button className="active"><FaCalendarAlt /> Events</button>
          <button onClick={() => navigate("/notices")}><FaBullhorn /> Announcements</button>
          <button><FaBookOpen /> Resources</button>
          <button onClick={() => navigate("/about")}><FaInfoCircle /> About Us</button>
          <button onClick={() => navigate("/")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      <section className="events-hero">
        <h1>Events</h1>
        <div className="events-divider"></div>
        <p>
          Discover exciting events, activities and programs organized for the
          Nepali community in Korea.
        </p>
      </section>

      <main className="events-layout">
        <aside className="events-filter">
          <h3>Filter Events</h3>

          <label>Search Events</label>
          <input placeholder="Search by event name, keyword..." />

          <h4>Event Type</h4>
          <label><input type="checkbox" defaultChecked /> All Types</label>
          <label><input type="checkbox" /> Cultural</label>
          <label><input type="checkbox" /> Sports</label>
          <label><input type="checkbox" /> Educational</label>
          <label><input type="checkbox" /> Social</label>
          <label><input type="checkbox" /> Workshop</label>
          <label><input type="checkbox" /> Other</label>

          <h4>Date</h4>
          <input type="date" />

          <h4>Location</h4>
          <select>
            <option>All Locations</option>
            <option>Seoul</option>
            <option>Naju</option>
            <option>Online</option>
          </select>

          <button className="apply-btn"><FaFilter /> Apply Filters</button>
          <button className="clear-btn"><FaUndo /> Clear Filters</button>
        </aside>

        <section className="events-main-list">
          <div className="events-header">
            <div>
              <h3>All Events</h3>
              <p>Showing 8 of 8 events</p>
            </div>

            <select>
              <option>Sort by: Upcoming</option>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>

          <div className="events-grid">
            {events.map((event, index) => (
              <div className="event-card" key={index}>
                <div className="event-img-wrap">
                  <img src={event.image} alt={event.title} />
                  <div className="floating-date">
                    <span>{event.date}</span>
                    <b>{event.day}</b>
                  </div>
                </div>

                <div className="event-body">
                  <span className={`event-tag ${event.type.toLowerCase()}`}>
                    {event.type}
                  </span>
                  <h3>{event.title}</h3>
                  <p><FaClock /> {event.time}</p>
                  <p><FaMapMarkerAlt /> {event.location}</p>
                  <button>View Details</button>
                </div>
              </div>
            ))}
          </div>

          <div className="events-pagination">
            <button>‹</button>
            <button className="current">1</button>
            <button>›</button>
          </div>
        </section>

        <aside className="events-right">
          <div className="upcoming-card">
            <div className="side-title">
              <h3>Upcoming Events</h3>
              <span>View All</span>
            </div>

            {events.slice(0, 4).map((event, index) => (
              <div className="mini-event" key={index}>
                <div className="mini-date">
                  <span>{event.date}</span>
                  <b>{event.day}</b>
                </div>
                <div>
                  <h4>{event.title}</h4>
                  <p><FaClock /> {event.time}</p>
                  <p><FaMapMarkerAlt /> {event.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="proposal-card">
            <h3>Want to organize an event?</h3>
            <p>We welcome event ideas from our community.</p>
            <button>Submit Event Proposal</button>
          </div>

          <div className="subscribe-card">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter to get the latest event updates.</p>
            <div className="subscribe-row">
              <input placeholder="Enter your email" />
              <button><FaPaperPlane /></button>
            </div>
          </div>
        </aside>
      </main>

      <footer className="events-footer">
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

export default Events;