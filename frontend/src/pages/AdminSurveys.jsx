import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminSurveys.css";

const QUESTION_TYPES = [
  { value: "short_text", label: "Short Answer" },
  { value: "long_text", label: "Paragraph" },
  { value: "mcq", label: "Multiple Choice" },
  { value: "checkbox", label: "Checkboxes" },
];

function QuestionEditor({ question, index, onChange, onDelete, onMove, total }) {
  const update = (field, value) => onChange({ ...question, [field]: value });

  const updateOption = (i, value) => {
    const opts = [...(question.options || [])];
    opts[i] = value;
    update("options", opts);
  };

  const addOption = () => update("options", [...(question.options || []), ""]);

  const removeOption = (i) =>
    update("options", (question.options || []).filter((_, idx) => idx !== i));

  const hasOptions = question.question_type === "mcq" || question.question_type === "checkbox";

  return (
    <div className="question-editor-card">
      <div className="qe-top-row">
        <span className="qe-number">Q{index + 1}</span>
        <input
          className="qe-text-input"
          placeholder="Question text"
          value={question.question_text}
          onChange={(e) => update("question_text", e.target.value)}
          required
        />
        <select
          className="qe-type-select"
          value={question.question_type}
          onChange={(e) => onChange({ ...question, question_type: e.target.value, options: [""] })}
        >
          {QUESTION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {hasOptions && (
        <div className="qe-options">
          {(question.options || [""]).map((opt, i) => (
            <div className="qe-option-row" key={i}>
              <span className="qe-option-bullet">
                {question.question_type === "mcq" ? "○" : "☐"}
              </span>
              <input
                className="qe-option-input"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
              />
              {(question.options || []).length > 1 && (
                <button type="button" className="qe-remove-opt" onClick={() => removeOption(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" className="qe-add-option" onClick={addOption}>+ Add option</button>
        </div>
      )}

      <div className="qe-bottom-row">
        <label className="qe-required-toggle">
          <input
            type="checkbox"
            checked={!!question.is_required}
            onChange={(e) => update("is_required", e.target.checked)}
          />
          Required
        </label>
        <div className="qe-actions">
          <button type="button" className="qe-move-btn" onClick={() => onMove(index, -1)} disabled={index === 0}>▲</button>
          <button type="button" className="qe-move-btn" onClick={() => onMove(index, 1)} disabled={index === total - 1}>▼</button>
          <button type="button" className="qe-delete-btn" onClick={() => onDelete(index)}>🗑 Delete</button>
        </div>
      </div>
    </div>
  );
}

const newQuestion = () => ({
  question_text: "",
  question_type: "short_text",
  options: [""],
  is_required: false,
});

function AdminSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [view, setView] = useState("list"); // "list" | "create" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", deadline: "" });
  const [questions, setQuestions] = useState([newQuestion()]);

  const getAuthHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  const fetchSurveys = async () => {
    try {
      const res = await API.get("/surveys");
      setSurveys(res.data);
    } catch {
      alert("Failed to fetch surveys");
    }
  };

  useEffect(() => { fetchSurveys(); }, []);

  const startCreate = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", deadline: "" });
    setQuestions([newQuestion()]);
    setView("create");
  };

  const startEdit = async (survey) => {
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
          : [""],
      }));
      setQuestions(qs.length > 0 ? qs : [newQuestion()]);
    } catch {
      setQuestions([newQuestion()]);
    }
    setView("edit");
  };

  const updateQuestion = (i, updated) => setQuestions(questions.map((q, idx) => idx === i ? updated : q));

  const deleteQuestion = (i) => {
    if (questions.length === 1) return alert("Survey must have at least one question.");
    setQuestions(questions.filter((_, idx) => idx !== i));
  };

  const moveQuestion = (i, dir) => {
    const qs = [...questions];
    const target = i + dir;
    if (target < 0 || target >= qs.length) return;
    [qs[i], qs[target]] = [qs[target], qs[i]];
    setQuestions(qs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const q of questions) {
      if (!q.question_text.trim()) return alert("All questions must have text.");
      if (q.question_type === "mcq" || q.question_type === "checkbox") {
        const opts = (q.options || []).filter((o) => o.trim());
        if (opts.length < 2) return alert(`"${q.question_text}" needs at least 2 options.`);
      }
    }

    const payload = {
      ...formData,
      questions: questions.map((q) => ({
        question_text: q.question_text,
        question_type: q.question_type,
        options: (q.question_type === "mcq" || q.question_type === "checkbox")
          ? (q.options || []).filter((o) => o.trim())
          : [],
        is_required: q.is_required,
      })),
    };

    setSaving(true);
    try {
      if (view === "edit" && editingId) {
        await API.put(`/surveys/${editingId}`, payload, { headers: getAuthHeader() });
        alert("Survey updated successfully");
      } else {
        await API.post("/surveys", payload, { headers: getAuthHeader() });
        alert("Survey created successfully");
      }
      setView("list");
      fetchSurveys();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save survey");
    } finally {
      setSaving(false);
    }
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

  // ── Builder view ──────────────────────────────────────────────
  if (view === "create" || view === "edit") {
    return (
      <div className="admin-surveys-page">
        <div className="admin-surveys-header">
          <h1>{view === "edit" ? "Edit Survey" : "Create Survey"}</h1>
          <p>Build a Google Forms-style survey with multiple question types.</p>
        </div>

        <form className="survey-builder" onSubmit={handleSubmit}>
          <div className="builder-meta-card">
            <input
              className="builder-title-input"
              placeholder="Survey Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              className="builder-desc-input"
              placeholder="Survey description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="builder-deadline-row">
              <label>Deadline (optional)</label>
              <input
                type="date"
                className="builder-deadline-input"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          {questions.map((q, i) => (
            <QuestionEditor
              key={i}
              question={q}
              index={i}
              total={questions.length}
              onChange={(updated) => updateQuestion(i, updated)}
              onDelete={() => deleteQuestion(i)}
              onMove={moveQuestion}
            />
          ))}

          <button type="button" className="add-question-btn" onClick={() => setQuestions([...questions, newQuestion()])}>
            + Add Question
          </button>

          <div className="builder-footer">
            <button type="button" className="cancel-btn" onClick={() => setView("list")}>Cancel</button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : view === "edit" ? "Update Survey" : "Create Survey"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── List view ─────────────────────────────────────────────────
  return (
    <div className="admin-surveys-page">
      <div className="admin-surveys-header">
        <h1>Survey Management</h1>
        <p>Create Google Forms-style surveys for NSA members.</p>
      </div>

      <div className="surveys-list-controls">
        <button className="create-survey-btn" onClick={startCreate}>+ Create New Survey</button>
      </div>

      <div className="surveys-table-card">
        <h2>All Surveys</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Title</th><th>Description</th><th>Deadline</th><th>Created At</th><th>Actions</th>
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
                    <button className="edit-btn" onClick={() => startEdit(s)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(s.survey_id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSurveys;
