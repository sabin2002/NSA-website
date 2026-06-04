import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminResources.css";

function AdminResources() {
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchResources = async () => {
    try {
      const res = await API.get("/resources");
      setResources(res.data);
    } catch (error) {
      alert("Failed to fetch resources");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      file: null,
    });

    setEditingId(null);

    const fileInput = document.getElementById("resource-file-input");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);

    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      if (editingId) {
        await API.put(`/resources/${editingId}`, data, {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Resource updated successfully");
      } else {
        if (!formData.file) {
          alert("Please select a file");
          return;
        }

        await API.post("/resources", data, {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Resource uploaded successfully");
      }

      resetForm();
      fetchResources();
    } catch (error) {
      alert(error.response?.data?.message || "Resource operation failed");
    }
  };

  const handleEdit = (resource) => {
    setEditingId(resource.resource_id);

    setFormData({
      title: resource.title || "",
      description: resource.description || "",
      category: resource.category || "",
      file: null,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;

    try {
      await API.delete(`/resources/${id}`, {
        headers: getAuthHeader(),
      });

      alert("Resource deleted successfully");
      fetchResources();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete resource");
    }
  };

  return (
    <div className="admin-resources-page">
      <div className="admin-resources-header">
        <h1>Resource Management</h1>
        <p>Upload, update, and delete student resources.</p>
      </div>

      <div className="admin-resources-layout">
        <form className="resource-form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Resource" : "Upload Resource"}</h2>

          <label>Title</label>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter resource title"
            required
          />

          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter description"
          />

          <label>Category</label>
          <input
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="Example: Visa, TOPIK, Academic"
          />

          <label>{editingId ? "Replace File Optional" : "Upload File"}</label>
          <input
            id="resource-file-input"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
          />

          <button className="save-btn">
            {editingId ? "Update Resource" : "Upload Resource"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <section className="resources-table-card">
          <h2>All Resources</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>File</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {resources.length === 0 ? (
                <tr>
                  <td colSpan="6">No resources found</td>
                </tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource.resource_id}>
                    <td>{resource.resource_id}</td>
                    <td>{resource.title}</td>
                    <td>{resource.category || "General"}</td>
                    <td>
                      <a
                        href={`http://localhost:5000${resource.file_path}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {resource.file_name}
                      </a>
                    </td>
                    <td>
                      {resource.created_at
                        ? new Date(resource.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(resource)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(resource.resource_id)}
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

export default AdminResources;