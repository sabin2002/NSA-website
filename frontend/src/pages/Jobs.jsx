import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Jobs.css";

function Jobs() {
  const navigate = useNavigate();

  const [jobs] = useState([
    {
      title: "Convenience Store Staff",
      company: "Naju Mart",
      location: "Naju, Korea",
      type: "Part-time",
      author: "John Doe",
      date: "April 10, 2026",
      icon: "🛒",
      desc: "Assist with store operations, customer service, stocking shelves, and maintaining cleanliness.",
    },
    {
      title: "Restaurant Kitchen Helper",
      company: "Himalayan Kitchen",
      location: "Seoul, Korea",
      type: "Part-time",
      author: "Admin",
      date: "April 8, 2026",
      icon: "🍴",
      desc: "Support kitchen staff in food preparation, cleaning, and maintaining kitchen hygiene.",
    },
    {
      title: "Tutor (Nepali/English)",
      company: "Self-employed",
      location: "Online",
      type: "Freelance",
      author: "Sita Gurung",
      date: "April 5, 2026",
      icon: "🎓",
      desc: "Teach Nepali or English language to students of different age groups online.",
    },
    {
      title: "Delivery Driver",
      company: "Quick Delivery",
      location: "Busan, Korea",
      type: "Part-time",
      author: "Prakash Rai",
      date: "April 3, 2026",
      icon: "🚚",
      desc: "Deliver packages and goods to customers safely and on time.",
    },
  ]);

  return (
    <div className="jobs-page">
      <nav className="jobs-nav">
        <div className="jobs-logo">
          <h2>NEPALESE</h2>
          <span>Student Association</span>
        </div>

        <div className="jobs-menu">
          <button onClick={() => navigate("/home")}>🏠 Home</button>
          <button className="active">💼 Jobs</button>
          <button onClick={() => navigate("/events")}>📅 Events</button>
          <button onClick={() => navigate("/notices")}>📢 Announcements</button>
          <button>📖 Resources</button>
          <button>ⓘ About Us</button>
          <button>🔔</button>
          <button>Hello, User ⌄</button>
        </div>
      </nav>

      <section className="jobs-hero">
        <h1>Jobs</h1>
        <p>Find job opportunities and build your career.</p>
        <span>Anyone can post a job. Everyone can find opportunities.</span>
      </section>

      <main className="jobs-layout">
        <aside className="filter-card">
          <h3>Search & Filter</h3>

          <input placeholder="Search by job title, keyword..." />

          <h4>Job Type</h4>
          <label><input type="checkbox" defaultChecked /> All Types</label>
          <label><input type="checkbox" /> Full-time</label>
          <label><input type="checkbox" /> Part-time</label>
          <label><input type="checkbox" /> Freelance</label>
          <label><input type="checkbox" /> Internship</label>
          <label><input type="checkbox" /> Volunteer</label>

          <h4>Location</h4>
          <select>
            <option>All Locations</option>
            <option>Naju</option>
            <option>Seoul</option>
            <option>Busan</option>
            <option>Online</option>
          </select>

          <h4>Category</h4>
          <select>
            <option>All Categories</option>
            <option>Restaurant</option>
            <option>Store</option>
            <option>Education</option>
            <option>Delivery</option>
          </select>

          <h4>Sort By</h4>
          <select>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>

          <button className="search-btn">🔍 Search Jobs</button>
        </aside>

        <section className="job-list-card">
          <div className="job-list-header">
            <h3>All Jobs</h3>
            <span>Showing {jobs.length} of {jobs.length} jobs</span>
          </div>

          {jobs.map((job, index) => (
            <div className="job-row" key={index}>
              <div className="job-icon">{job.icon}</div>

              <div className="job-info">
                <h3>{job.title}</h3>
                <h4>{job.company}</h4>
                <p>📍 {job.location} · Posted {job.date} · By: {job.author}</p>
                <p>{job.desc}</p>
              </div>

              <div className="job-action">
                <span>{job.type}</span>
                <button>View Details</button>
              </div>
            </div>
          ))}

          <div className="pagination">
            <button>‹</button>
            <button className="current">1</button>
            <button>›</button>
          </div>
        </section>

        <aside className="post-job-card">
          <h3>Post a Job</h3>
          <p>Both users and admins can post jobs.</p>

          <label>Job Title *</label>
          <input placeholder="Enter job title" />

          <label>Company / Organization *</label>
          <input placeholder="Enter company name" />

          <label>Location *</label>
          <input placeholder="Enter location" />

          <label>Job Type *</label>
          <select>
            <option>Select job type</option>
            <option>Part-time</option>
            <option>Full-time</option>
            <option>Freelance</option>
          </select>

          <label>Category</label>
          <select>
            <option>Select category</option>
            <option>Restaurant</option>
            <option>Store</option>
            <option>Education</option>
          </select>

          <label>Description *</label>
          <textarea placeholder="Enter job description"></textarea>

          <label>Contact Email / Phone *</label>
          <input placeholder="Enter email or phone" />

          <label>Application Deadline</label>
          <input type="date" />

          <button>Post Job</button>
          <small>By posting, you agree to our community guidelines.</small>
        </aside>
      </main>
    </div>
  );
}

export default Jobs;