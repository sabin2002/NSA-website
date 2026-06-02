import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminJobs.css";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "",
    description: "",
    contact_info: "",
    deadline: "",
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      job_type: "",
      description: "",
      contact_info: "",
      deadline: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/jobs/${editingId}`, formData, {
          headers: getAuthHeader(),
        });

        alert("Job updated successfully");
      } else {
        await API.post("/jobs", formData, {
          headers: getAuthHeader(),
        });

        alert("Job created successfully");
      }

      resetForm();
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || "Job operation failed");
    }
  };

  const handleEdit = (job) => {
    setEditingId(job.job_id);

    setFormData({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      job_type: job.job_type || "",
      description: job.description || "",
      contact_info: job.contact_info || "",
      deadline: job.deadline ? job.deadline.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`, {
        headers: getAuthHeader(),
      });

      alert("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="admin-jobs-page">
      <div className="admin-jobs-header">
        <h1>Job Management</h1>
        <p>Create, view, update, and delete NSA job posts.</p>
      </div>

      <div className="admin-jobs-layout">
        <form className="job-form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Job" : "Create Job"}</h2>

          <label>Job Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            required
          />

          <label>Company</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />

          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />

          <label>Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            required
          >
            <option value="">Select job type</option>
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
            <option value="Volunteer">Volunteer</option>
          </select>

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            required
          />

          <label>Contact Info</label>
          <input
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            placeholder="Email or phone number"
            required
          />

          <label>Application Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

          <button className="save-btn">
            {editingId ? "Update Job" : "Create Job"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <section className="jobs-table-card">
          <h2>All Jobs</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Contact</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="8">No jobs found</td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.job_id}</td>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.job_type}</td>
                    <td>{job.contact_info}</td>
                    <td>
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(job)}>
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(job.job_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default AdminJobs;