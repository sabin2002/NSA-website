import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminNotices.css";

function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

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

  useEffect(() => {
    fetchNotices();
  }, []);

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

  return (
    <div className="admin-notices-page">
      <div className="admin-notices-header">
        <h1>Notice Management</h1>
        <p>Create, view, update, and delete NSA notices.</p>
      </div>

      <div className="admin-notices-layout">
        <form className="notice-form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Notice" : "Create Notice"}</h2>

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
            placeholder="Enter notice content"
            required
          />

          <button className="save-btn">
            {editingId ? "Update Notice" : "Create Notice"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <section className="notices-table-card">
          <h2>All Notices</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {notices.length === 0 ? (
                <tr>
                  <td colSpan="5">No notices found</td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr key={notice.notice_id}>
                    <td>{notice.notice_id}</td>
                    <td>{notice.title}</td>
                    <td>{notice.content}</td>
                    <td>{notice.created_at?.slice(0, 10)}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(notice)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(notice.notice_id)}
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

export default AdminNotices;