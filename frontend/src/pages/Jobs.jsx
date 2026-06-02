import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Jobs.css";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      alert("Failed to fetch jobs");
    }
  };

  const applyForJob = async (jobId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before applying for a job.");
      navigate("/login");
      return;
    }

    const message = prompt(
      "Write a short message for your application:",
      "I am interested in this job."
    );

    if (message === null) return;

    try {
      await API.post(
        "/job-applications",
        {
          job_id: jobId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job application submitted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit application");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.description}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      jobType === "All Types" || job.job_type === jobType;

    const matchesLocation =
      location === "All Locations" ||
      job.location?.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="jobs-page">
      <section className="jobs-hero">
        <h1>Jobs</h1>
        <p>Find job opportunities and build your career.</p>
        <span>Browse latest job opportunities shared by NSA admins.</span>
      </section>

      <main className="jobs-layout">
        <aside className="filter-card">
          <h3>Search & Filter</h3>

          <input
            placeholder="Search by job title, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h4>Job Type</h4>

          {[
            "All Types",
            "Full-time",
            "Part-time",
            "Freelance",
            "Internship",
            "Volunteer",
          ].map((type) => (
            <label key={type}>
              <input
                type="radio"
                checked={jobType === type}
                onChange={() => setJobType(type)}
              />{" "}
              {type}
            </label>
          ))}

          <h4>Location</h4>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>All Locations</option>
            <option>Naju</option>
            <option>Seoul</option>
            <option>Busan</option>
            <option>Online</option>
          </select>

          <button
            className="search-btn"
            onClick={() => {
              setSearch("");
              setJobType("All Types");
              setLocation("All Locations");
            }}
          >
            Reset Filters
          </button>
        </aside>

        <section className="job-list-card">
          <div className="job-list-header">
            <h3>All Jobs</h3>
            <span>
              Showing {filteredJobs.length} of {jobs.length} jobs
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <div className="job-row" key={job.job_id}>
                <div className="job-icon">💼</div>

                <div className="job-info">
                  <h3>{job.title}</h3>
                  <h4>{job.company || "Company TBA"}</h4>

                  <p>
                    📍 {job.location || "Location TBA"} · Posted{" "}
                    {formatDate(job.created_at)}
                  </p>

                  <p>{job.description}</p>

                  <p>
                    <strong>Contact:</strong> {job.contact_info || "N/A"}
                  </p>

                  <p>
                    <strong>Deadline:</strong> {formatDate(job.deadline)}
                  </p>
                </div>

                <div className="job-action">
                  <span>{job.job_type || "Job"}</span>

                  <button onClick={() => applyForJob(job.job_id)}>
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="pagination">
            <button>‹</button>
            <button className="current">1</button>
            <button>›</button>
          </div>
        </section>

        <aside className="post-job-card">
          <h3>Want to post a job?</h3>
          <p>
            Job posts are managed by NSA administrators to keep information
            reliable and safe for students.
          </p>

          <button onClick={() => navigate("/admin/jobs")}>
            Admin Job Management
          </button>

          <small>
            Please contact NSA admins if you want to share a job opportunity.
          </small>
        </aside>
      </main>
    </div>
  );
}

export default Jobs;