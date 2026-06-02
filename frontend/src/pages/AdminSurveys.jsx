import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminSurveys.css";

function AdminSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchSurveys = async () => {
    try {
      const res = await API.get("/surveys");
      setSurveys(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch surveys");
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      deadline: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/surveys/${editingId}`, formData, {
          headers: getAuthHeader(),
        });
        alert("Survey updated successfully");
      } else {
        await API.post("/surveys", formData, {
          headers: getAuthHeader(),
        });
        alert("Survey created successfully");
      }

      resetForm();
      fetchSurveys();
    } catch (error) {
      alert(error.response?.data?.message || "Survey operation failed");
    }
  };

  const handleEdit = (survey) => {
    setEditingId(survey.survey_id);

    setFormData({
      title: survey.title || "",
      description: survey.description || "",
      deadline: survey.deadline ? survey.deadline.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this survey?")) return;

    try {
      await API.delete(`/surveys/${id}`, {
        headers: getAuthHeader(),
      });

      alert("Survey deleted successfully");
      fetchSurveys();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete survey");
    }
  };

  return (
    <div className="admin-surveys-page">
      <div className="admin-surveys-header">
        <h1>Survey Management</h1>
        <p>Create, view, update, and delete NSA surveys.</p>
      </div>

      <div className="admin-surveys-layout">
        <form className="survey-form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Survey" : "Create Survey"}</h2>

          <label>Survey Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter survey title"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter survey description"
            required
          />

          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

          <button className="save-btn">
            {editingId ? "Update Survey" : "Create Survey"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <section className="surveys-table-card">
          <h2>All Surveys</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {surveys.length === 0 ? (
                <tr>
                  <td colSpan="6">No surveys found</td>
                </tr>
              ) : (
                surveys.map((survey) => (
                  <tr key={survey.survey_id}>
                    <td>{survey.survey_id}</td>
                    <td>{survey.title}</td>
                    <td>{survey.description}</td>
                    <td>
                      {survey.deadline
                        ? new Date(survey.deadline).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{survey.created_at?.slice(0, 10)}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(survey)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(survey.survey_id)}
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

export default AdminSurveys;