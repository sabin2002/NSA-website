import { useEffect, useState } from "react";
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
import API from "../api/axios";
import "./Events.css";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const defaultImage =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800";

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      alert("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const registerEvent = async (eventId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before registering for an event.");
      navigate("/");
      return;
    }

    try {
      await API.post(
        "/event-registrations",
        { event_id: eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Registered successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getMonth = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString)
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
  };

  const getDay = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).getDate();
  };

  const filteredEvents = events.filter((event) =>
    `${event.title} ${event.description} ${event.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="events-page">
    
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
          <input
            placeholder="Search by event name, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h4>Event Type</h4>
          <label>
            <input type="checkbox" defaultChecked /> All Types
          </label>
          <label>
            <input type="checkbox" /> Cultural
          </label>
          <label>
            <input type="checkbox" /> Sports
          </label>
          <label>
            <input type="checkbox" /> Educational
          </label>
          <label>
            <input type="checkbox" /> Social
          </label>
          <label>
            <input type="checkbox" /> Workshop
          </label>
          <label>
            <input type="checkbox" /> Other
          </label>

          <h4>Date</h4>
          <input type="date" />

          <h4>Location</h4>
          <select>
            <option>All Locations</option>
            <option>Seoul</option>
            <option>Naju</option>
            <option>Online</option>
          </select>

          <button className="apply-btn">
            <FaFilter /> Apply Filters
          </button>
          <button className="clear-btn" onClick={() => setSearch("")}>
            <FaUndo /> Clear Filters
          </button>
        </aside>

        <section className="events-main-list">
          <div className="events-header">
            <div>
              <h3>All Events</h3>
              <p>
                Showing {filteredEvents.length} of {events.length} events
              </p>
            </div>

            <select>
              <option>Sort by: Upcoming</option>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>

          <div className="events-grid">
            {filteredEvents.length === 0 ? (
              <p>No events found.</p>
            ) : (
              filteredEvents.map((event) => (
                <div className="event-card" key={event.event_id}>
                  <div className="event-img-wrap">
                    <img src={event.image || defaultImage} alt={event.title} />
                    <div className="floating-date">
                      <span>{getMonth(event.event_date)}</span>
                      <b>{getDay(event.event_date)}</b>
                    </div>
                  </div>

                  <div className="event-body">
                    <span className="event-tag sports">Event</span>
                    <h3>{event.title}</h3>
                    <p>
                      <FaClock /> {formatDate(event.event_date)} ·{" "}
                      {event.event_time || "Time TBA"}
                    </p>
                    <p>
                      <FaMapMarkerAlt /> {event.location || "Location TBA"}
                    </p>

                    <p>{event.description}</p>

                    <button onClick={() => registerEvent(event.event_id)}>
                      Register
                    </button>
                  </div>
                </div>
              ))
            )}
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

            {events.slice(0, 4).map((event) => (
              <div className="mini-event" key={event.event_id}>
                <div className="mini-date">
                  <span>{getMonth(event.event_date)}</span>
                  <b>{getDay(event.event_date)}</b>
                </div>
                <div>
                  <h4>{event.title}</h4>
                  <p>
                    <FaClock /> {formatDate(event.event_date)} ·{" "}
                    {event.event_time || "Time TBA"}
                  </p>
                  <p>
                    <FaMapMarkerAlt /> {event.location || "Location TBA"}
                  </p>
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
              <button>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Events;