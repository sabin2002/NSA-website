import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminSurveyResponses.css";

const getAuthHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

function AnswerBar({ label, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="answer-bar-row">
      <span className="answer-bar-label">{label}</span>
      <div className="answer-bar-track">
        <div className="answer-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="answer-bar-stat">{count} ({pct}%)</span>
    </div>
  );
}

function SummaryCard({ question }) {
  const total = question.answers.reduce((sum, a) => sum + a.count, 0);
  const isChart = question.question_type === "mcq" || question.question_type === "checkbox";
  return (
    <div className="summary-card">
      <div className="summary-q-text">{question.question_text}</div>
      <div className="summary-q-meta">
        {question.question_type.replace("_", " ")} · {total} response{total !== 1 ? "s" : ""}
      </div>
      {isChart ? (
        <div className="answer-bars">
          {question.answers.map((a, i) => (
            <AnswerBar key={i} label={a.value} count={a.count} total={total} />
          ))}
        </div>
      ) : (
        <div className="text-answers">
          {question.answers.map((a, i) => (
            <div key={i} className="text-answer-pill">{a.value}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function RespondentRow({ respondent, expanded, onExpand }) {
  return (
    <>
      <tr className={`respondent-row ${expanded ? "expanded" : ""}`} onClick={onExpand}>
        <td>{respondent.user_name}</td>
        <td>{respondent.user_email}</td>
        <td>{respondent.answers.length} answers</td>
        <td>{respondent.submitted_at?.slice(0, 10)}</td>
        <td><button className="expand-btn">{expanded ? "▲ Hide" : "▼ View"}</button></td>
      </tr>
      {expanded && (
        <tr className="respondent-detail-row">
          <td colSpan="5">
            <div className="respondent-answers">
              {respondent.answers.map((a, i) => (
                <div key={i} className="respondent-answer-item">
                  <div className="respondent-q">{a.question}</div>
                  <div className="respondent-a">{a.answer}</div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function AdminSurveyResponses() {
  const [surveys, setSurveys] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("summary");
  const [summary, setSummary] = useState([]);
  const [respondents, setRespondents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/surveys").then((r) => setSurveys(r.data)).catch(() => {});
  }, []);

  const loadSurvey = async (survey) => {
    setSelected(survey);
    setExpandedRow(null);
    setLoading(true);
    try {
      const [sumRes, indRes] = await Promise.all([
        API.get(`/survey-responses/v2/survey/${survey.survey_id}/summary`, { headers: getAuthHeader() }),
        API.get(`/survey-responses/v2/survey/${survey.survey_id}`, { headers: getAuthHeader() }),
      ]);
      setSummary(sumRes.data);
      setRespondents(indRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load responses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-responses-page">
      <div className="admin-responses-header">
        <h1>Survey Responses</h1>
        <p>View summaries and individual submissions for each survey.</p>
      </div>

      <div className="responses-layout">
        <aside className="survey-sidebar">
          <h3>Surveys</h3>
          {surveys.length === 0 && <p className="sidebar-empty">No surveys yet.</p>}
          {surveys.map((s) => (
            <button
              key={s.survey_id}
              className={`sidebar-survey-btn ${selected?.survey_id === s.survey_id ? "active" : ""}`}
              onClick={() => loadSurvey(s)}
            >
              <span className="ssb-title">{s.title}</span>
              <span className="ssb-date">{s.deadline ? new Date(s.deadline).toLocaleDateString() : "No deadline"}</span>
            </button>
          ))}
        </aside>

        <main className="responses-main">
          {!selected ? (
            <div className="responses-placeholder">
              <span>👈</span>
              <p>Select a survey to view its responses.</p>
            </div>
          ) : loading ? (
            <div className="responses-placeholder"><p>Loading responses…</p></div>
          ) : (
            <>
              <div className="responses-panel-header">
                <div>
                  <h2>{selected.title}</h2>
                  <span className="resp-count">
                    {respondents.length} respondent{respondents.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="tab-group">
                  <button className={`tab-btn ${tab === "summary" ? "active" : ""}`} onClick={() => setTab("summary")}>Summary</button>
                  <button className={`tab-btn ${tab === "individual" ? "active" : ""}`} onClick={() => setTab("individual")}>Individual</button>
                </div>
              </div>

              {tab === "summary" && (
                <div className="summary-grid">
                  {summary.length === 0
                    ? <p className="no-data">No responses yet for this survey.</p>
                    : summary.map((q) => <SummaryCard key={q.question_id} question={q} />)
                  }
                </div>
              )}

              {tab === "individual" && (
                <div className="responses-card">
                  {respondents.length === 0 ? (
                    <p className="no-data">No responses yet for this survey.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr><th>Name</th><th>Email</th><th>Answers</th><th>Submitted</th><th></th></tr>
                      </thead>
                      <tbody>
                        {respondents.map((r) => (
                          <RespondentRow
                            key={r.user_id}
                            respondent={r}
                            expanded={expandedRow === r.user_id}
                            onExpand={() => setExpandedRow(expandedRow === r.user_id ? null : r.user_id)}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminSurveyResponses;
