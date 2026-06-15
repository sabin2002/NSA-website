import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminSurveys.css";

const QUESTION_TYPES = [
  { value: "short_text", label: "Short Answer" },
  { value: "long_text", label: "Paragraph" },
  { value: "mcq", label: "Multiple Choice" },
  { value: "checkbox", label: "Checkboxes" },
];

const newQuestion = () => ({
  question_text: "",
  question_type: "short_text",
  options: ["", ""],
  is_required: false,
});

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function AdminSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", deadline: "" });
  const [questions, setQuestions] = useState([newQuestion()]);

  const fetchSurveys = async () => {
    try {
      const res = await API.get("/surveys");
      setSurveys(res.data);
    } catch {
      alert("Failed to fetch surveys");
    }
  };

  useEffect(() => { fetchSurveys(); }, []);

  const resetForm = () => {
    setFormData({ title: "", description: "", deadline: "" });
    setQuestions([newQuestion()]);
    setEditingId(null);
  };

  const handleEdit = async (survey) => {
    setEditingId(survey.survey_id);
    setFormData({
      title: survey.title || "",
      description: survey.description || "",
      deadline: survey.deadline ? survey.deadline.slice(0, 10) : "",
    });
    try {
      const res = await API.get(`/surveys/${survey.survey_id}/questions`);
      const qs = res.data.map((q) => ({
        ...q,
        options: q.options
          ? Array.isArray(q.options) ? q.options : JSON.parse(q.options)
          : ["", ""],
      }));
      setQuestions(qs.length > 0 ? qs : [newQuestion()]);
    } catch {
      setQuestions([newQuestion()]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this survey and all its responses?")) return;
    try {
      await API.delete(`/surveys/${id}`, { headers: getAuthHeader() });
      fetchSurveys();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete survey");
    }
  };

  // Question helpers
  const updateQuestion = (i, field, value) => {
    setQuestions(questions.map((q, idx) =>
      idx === i ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (qi, oi, value) => {
    const opts = [...(questions[qi].options || [])];
    opts[oi] = value;
    updateQuestion(qi, "options", opts);
  };

  const addOption = (qi) => {
    updateQuestion(qi, "options", [...(questions[qi].options || []), ""]);
  };

  const removeOption = (qi, oi) => {
    updateQuestion(qi, "options", questions[qi].options.filter((_, i) => i !== oi));
  };

  const addQuestion = () => setQuestions([...questions, newQuestion()]);

  const removeQuestion = (i) => {
    if (questions.length === 1) return alert("Survey must have at least one question.");
    setQuestions(questions.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const q of questions) {
      if (!q.question_text.trim()) return alert("All questions must have text.");
      if (q.question_type === "mcq" || q.question_type === "checkbox") {
        if ((q.options || []).filter(o => o.trim()).length < 2)
          return alert(`"${q.question_text}" needs at least 2 options.`);
      }
    }

    const payload = {
      ...formData,
      questions: questions.map((q) => ({
        question_text: q.question_text,
        question_type: q.question_type,
        options: (q.question_type === "mcq" || q.question_type === "checkbox")
          ? (q.options || []).filter(o => o.trim())
          : [],
        is_required: q.is_required,
      })),
    };

    setSaving(true);
    try {
      if (editingId) {
        await API.put(`/surveys/${editingId}`, payload, { headers: getAuthHeader() });
        alert("Survey updated successfully");
      } else {
        await API.post("/surveys", payload, { headers: getAuthHeader() });
        alert("Survey created successfully");
      }
      resetForm();
      fetchSurveys();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save survey");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-surveys-page">
      <div className="admin-surveys-header">
        <h1>Survey Management</h1>
        <p>Create Google Forms-style surveys with multiple question types.</p>
      </div>

      <div className="admin-surveys-layout">
        {/* ── Left: Form ── */}
        <form className="survey-form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Survey" : "Create Survey"}</h2>

          <label>Survey Title</label>
          <input
            placeholder="Enter survey title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter survey description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <label>Deadline (optional)</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />

          {/* Questions */}
          <div className="questions-section">
            <div className="questions-section-title">Questions</div>

            {questions.map((q, qi) => (
              <div className="question-card" key={qi}>
                <div className="question-card-header">
                  <span className="question-num">Q{qi + 1}</span>
                  <select
                    className="question-type-select"
                    value={q.question_type}
                    onChange={(e) => updateQuestion(qi, "question_type", e.target.value)}
                  >
                    {QUESTION_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="remove-question-btn"
                    onClick={() => removeQuestion(qi)}
                  >✕</button>
                </div>

                <input
                  className="question-text-input"
                  placeholder="Question text"
                  value={q.question_text}
                  onChange={(e) => updateQuestion(qi, "question_text", e.target.value)}
                  required
                />

                {(q.question_type === "mcq" || q.question_type === "checkbox") && (
                  <div className="options-list">
                    {(q.options || []).map((opt, oi) => (
                      <div className="option-row" key={oi}>
                        <span className="option-bullet">
                          {q.question_type === "mcq" ? "○" : "☐"}
                        </span>
                        <input
                          className="option-input"
                          placeholder={`Option ${oi + 1}`}
                          value={opt}
                          onChange={(e) => updateOption(qi, oi, e.target.value)}
                        />
                        {q.options.length > 2 && (
                          <button type="button" className="remove-opt-btn" onClick={() => removeOption(qi, oi)}>✕</button>
                        )}
                      </div>
                    ))}
                    <button type="button" className="add-opt-btn" onClick={() => addOption(qi)}>
                      + Add option
                    </button>
                  </div>
                )}

                <label className="required-label">
                  <input
                    type="checkbox"
                    checked={!!q.is_required}
                    onChange={(e) => updateQuestion(qi, "is_required", e.target.checked)}
                  />
                  Required
                </label>
              </div>
            ))}

            <button type="button" className="add-question-btn" onClick={addQuestion}>
              + Add Question
            </button>
          </div>

          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update Survey" : "Create Survey"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        {/* ── Right: Table ── */}
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
                <tr><td colSpan="6" style={{ textAlign: "center" }}>No surveys found</td></tr>
              ) : (
                surveys.map((s) => (
                  <tr key={s.survey_id}>
                    <td>{s.survey_id}</td>
                    <td>{s.title}</td>
                    <td>{s.description}</td>
                    <td>{s.deadline ? new Date(s.deadline).toLocaleDateString() : "N/A"}</td>
                    <td>{s.created_at?.slice(0, 10)}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(s.survey_id)}>Delete</button>
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
