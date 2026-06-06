import { useEffect, useState } from "react";
import {
  FaBullhorn,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";
import API from "../api/axios";
import "./AdminNotices.css";

function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchNotices = async () => {
    try {
      const res = await API.get("/notices");
      setNotices(res.data);
    } catch (error) {
      alert("Failed to fetch notices");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/notices/${editingId}`, formData, {
          headers: getAuthHeader(),
        });

        alert("Notice updated successfully");
      } else {
        await API.post("/notices", formData, {
          headers: getAuthHeader(),
        });

        alert("Notice created successfully");
      }

      resetForm();
      fetchNotices();
    } catch (error) {
      alert(error.response?.data?.message || "Notice operation failed");
    }
  };

  const handleEdit = (notice) => {
    setEditingId(notice.notice_id);

    setFormData({
      title: notice.title || "",
      content: notice.content || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      await API.delete(`/notices/${id}`, {
        headers: getAuthHeader(),
      });

      alert("Notice deleted successfully");
      fetchNotices();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete notice");
    }
  };

  const filteredNotices = notices.filter((notice) =>
    `${notice.title} ${notice.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-notices-page">
      <div className="admin-notices-header">
        <div>
          <h1>
            <FaBullhorn /> Notice Management
          </h1>
          <p>Create, update, and manage NSA announcements.</p>
        </div>
      </div>

      <div className="admin-notices-layout">
        <form className="notice-form-card" onSubmit={handleSubmit}>
          <div className="form-title">
            <h2>{editingId ? "Edit Notice" : "Create Notice"}</h2>
            {editingId ? <FaEdit /> : <FaPlus />}
          </div>

          <label>Notice Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            required
          />

          <label>Notice Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write notice content here..."
            required
          />

          <button className="save-btn">
            {editingId ? "Update Notice" : "Create Notice"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              <FaTimes /> Cancel Edit
            </button>
          )}
        </form>

        <section className="notices-list-card">
          <div className="notices-list-header">
            <div>
              <h2>All Notices</h2>
              <p>
                Showing {filteredNotices.length} of {notices.length} notices
              </p>
            </div>

            <div className="notice-search-box">
              <FaSearch />
              <input
                placeholder="Search notices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredNotices.length === 0 ? (
            <div className="empty-notices">
              <h3>No notices found</h3>
              <p>Create a notice or change your search keyword.</p>
            </div>
          ) : (
            <div className="notice-card-grid">
              {filteredNotices.map((notice) => (
                <div className="notice-card" key={notice.notice_id}>
                  <div className="notice-card-top">
                    <span className="notice-badge">
                      <FaBullhorn /> Notice
                    </span>

                    <span className="notice-date">
                      <FaCalendarAlt />{" "}
                      {notice.created_at
                        ? new Date(notice.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <h3>{notice.title}</h3>

                  <p>{notice.content}</p>

                  <div className="notice-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(notice)}
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(notice.notice_id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminNotices;