import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBullhorn,
  FaSearch,
  FaFilter,
  FaUndo,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import API from "../api/axios";
import "./Notices.css";

function Notices() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await API.get("/notices");
      setNotices(res.data);
    } catch (error) {
      alert("Failed to fetch announcements");
    }
  };

  const filteredNotices = notices.filter((notice) =>
    `${notice.title} ${notice.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="notices-page">
      <section className="notices-hero">
        <h1>Announcements</h1>
        <div className="notices-divider"></div>
        <p>
          Stay informed with the latest updates, notices and important
          information.
        </p>
      </section>

      <main className="notices-layout">
        <aside className="notice-filter">
          <h3>Filter Announcements</h3>

          <label>Search</label>
          <div className="search-box">
            <input
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch />
          </div>

          <h4>Category</h4>
          <label>
            <input type="checkbox" defaultChecked /> All Categories
          </label>
          <label>
            <input type="checkbox" /> General
          </label>
          <label>
            <input type="checkbox" /> Academic
          </label>
          <label>
            <input type="checkbox" /> Scholarship
          </label>
          <label>
            <input type="checkbox" /> Event
          </label>
          <label>
            <input type="checkbox" /> Notice
          </label>
          <label>
            <input type="checkbox" /> Other
          </label>

          <h4>Date</h4>
          <input type="date" />

          <button className="apply-btn">
            <FaFilter /> Apply Filters
          </button>
          <button className="clear-btn" onClick={() => setSearch("")}>
            <FaUndo /> Clear Filters
          </button>
        </aside>

        <section className="notice-list">
          <div className="notice-header">
            <h3>All Announcements</h3>
            <span>
              Showing {filteredNotices.length} of {notices.length} announcements
            </span>
          </div>

          {filteredNotices.length === 0 ? (
            <p>No announcements found.</p>
          ) : (
            filteredNotices.map((notice) => (
              <div className="notice-row" key={notice.notice_id}>
                <div className="notice-icon red">
                  <FaBullhorn />
                </div>

                <div className="notice-content">
                  <h3>{notice.title}</h3>
                  <span className="notice-tag red">Notice</span>
                  <p>{notice.content}</p>
                </div>

                <div className="notice-meta">
                  <p>📅 {formatDate(notice.created_at)}</p>
                  <p>By Admin</p>
                </div>

                <button className="details-btn">View Details</button>
              </div>
            ))
          )}

          <div className="notice-pagination">
            <button>‹</button>
            <button className="current">1</button>
            <button>›</button>
          </div>
        </section>
      </main>

      
    </div>
  );
}

export default Notices;