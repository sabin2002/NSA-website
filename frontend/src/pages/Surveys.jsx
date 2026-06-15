import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPoll, FaPaperPlane, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import API from "../api/axios";
import "./Surveys.css";

function Surveys() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get("/surveys").then((r) => setSurveys(r.data)).catch(() => alert("Failed to fetch surveys"));
  }, []);

  const openSurvey = async (survey) => {
    try {
      const res = await API.get(`/surveys/${survey.survey_id}/questions`);
      setSelected(survey);
      setQuestions(res.data);
      setAnswers({});
      setSubmitted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load survey");
    }
  };

  const updateAnswer = (qId, value) =>
    setAnswers((prev) => ({ ...prev, [qId]: value }));

  const toggleCheckbox = (qId, option) => {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[qId]) ? prev[qId] : [];
      const next = cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option];
      return { ...prev, [qId]: next };
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login before submitting a survey."); navigate("/login"); return; }

    for (const q of questions) {
      const ans = answers[q.question_id];
      if (q.is_required) {
        if (!ans || (Array.isArray(ans) && ans.length === 0) || String(ans).trim() === "") {
          alert(`Please answer: ${q.question_text}`); return;
        }
      }
    }

    const serialized = {};
    for (const [qId, val] of Object.entries(answers)) {
      serialized[qId] = Array.isArray(val) ? JSON.stringify(val) : val;
    }

    setSubmitting(true);
    try {
      await API.post(
        "/survey-responses/v2",
        { survey_id: selected.survey_id, answers: serialized },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit survey");
    } finally {
      setSubmitting(false);
    }
  };

  const parseOptions = (options) => {
    if (!options) return [];
    if (Array.isArray(options)) return options;
    try { return JSON.parse(options); } catch { return []; }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString() : "No deadline";

  // Success screen
  if (submitted) {
    return (
      <div className="surveys-page">
        <section className="surveys-hero">
          <h1>Surveys</h1>
          <div className="surveys-divider"></div>
        </section>
        <div className="survey-success-card">
          <FaCheckCircle className="success-icon" />
          <h2>Response Submitted!</h2>
          <p>Thank you for completing <strong>{selected?.title}</strong>.</p>
          <button className="back-btn" onClick={() => { setSelected(null); setSubmitted(false); }}>
            <FaArrowLeft /> Back to Surveys
          </button>
        </div>
      </div>
    );
  }

  // Survey form
  if (selected) {
    return (
      <div className="surveys-page">
        <section className="surveys-hero">
          <h1>Surveys</h1>
          <div className="surveys-divider"></div>
        </section>
        <div className="survey-take-layout">
          <button className="back-link" onClick={() => setSelected(null)}>
            <FaArrowLeft /> All Surveys
          </button>

          <div className="survey-take-header">
            <h2>{selected.title}</h2>
            {selected.description && <p>{selected.description}</p>}
            {selected.deadline && (
              <span className="deadline-badge">Due: {fmtDate(selected.deadline)}</span>
            )}
          </div>

          {questions.length === 0 ? (
            <p>No questions found for this survey.</p>
          ) : (
            <>
              {questions.map((q, idx) => (
                <div className="question-box" key={q.question_id}>
                  <label>
                    {idx + 1}. {q.question_text}
                    {q.is_required && <span className="required-star"> *</span>}
                  </label>

                  {q.question_type === "mcq" && (
                    <div className="mcq-options">
                      {parseOptions(q.options).map((opt, i) => (
                        <label className="mcq-option" key={i}>
                          <input
                            type="radio"
                            name={`q_${q.question_id}`}
                            value={opt}
                            checked={answers[q.question_id] === opt}
                            onChange={(e) => updateAnswer(q.question_id, e.target.value)}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {q.question_type === "checkbox" && (
                    <div className="mcq-options">
                      {parseOptions(q.options).map((opt, i) => (
                        <label className="mcq-option" key={i}>
                          <input
                            type="checkbox"
                            checked={(Array.isArray(answers[q.question_id]) ? answers[q.question_id] : []).includes(opt)}
                            onChange={() => toggleCheckbox(q.question_id, opt)}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {q.question_type === "short_text" && (
                    <input
                      type="text"
                      placeholder="Your answer"
                      value={answers[q.question_id] || ""}
                      onChange={(e) => updateAnswer(q.question_id, e.target.value)}
                    />
                  )}

                  {q.question_type === "long_text" && (
                    <textarea
                      placeholder="Your answer"
                      value={answers[q.question_id] || ""}
                      onChange={(e) => updateAnswer(q.question_id, e.target.value)}
                    />
                  )}
                </div>
              ))}

              <div className="survey-submit-row">
                <button className="submit-survey-btn" onClick={handleSubmit} disabled={submitting}>
                  <FaPaperPlane /> {submitting ? "Submitting..." : "Submit Survey"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Survey list
  return (
    <div className="surveys-page">
      <section className="surveys-hero">
        <h1>Surveys</h1>
        <div className="surveys-divider"></div>
        <p>Participate in surveys and help NSA improve student services.</p>
      </section>

      <main className="surveys-layout">
        <section className="surveys-list">
          <div className="surveys-header">
            <div>
              <h2>Available Surveys</h2>
              <p>Select a survey to fill it out.</p>
            </div>
          </div>

          {surveys.length === 0 ? (
            <p>No surveys available at the moment.</p>
          ) : (
            surveys.map((s) => (
              <div className="survey-card" key={s.survey_id}>
                <div className="survey-icon"><FaPoll /></div>
                <div className="survey-info">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <div className="survey-meta">
                    <span>Deadline: {fmtDate(s.deadline)}</span>
                    <span className="open-status">Open</span>
                  </div>
                </div>
                <button className="submit-survey-btn" onClick={() => openSurvey(s)}>
                  <FaPaperPlane /> Start
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default Surveys;
