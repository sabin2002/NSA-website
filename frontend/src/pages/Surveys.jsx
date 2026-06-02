import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPoll,
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import API from "../api/axios";
import "./Surveys.css";

function Surveys() {
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await API.get("/surveys");
      setSurveys(res.data);

      if (res.data.length > 0) {
        setSelectedSurveyId(res.data[0].survey_id);
      }
    } catch (error) {
      alert("Failed to fetch surveys");
    }
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";
    return new Date(date).toLocaleDateString();
  };

  const submitSurveyResponse = async (surveyId = selectedSurveyId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before submitting a survey.");
      navigate("/");
      return;
    }

    if (!surveyId) {
      alert("Please select a survey.");
      return;
    }

    if (!responseText.trim()) {
      alert("Please write your response.");
      return;
    }

    try {
      await API.post(
        "/survey-responses",
        {
          survey_id: surveyId,
          response_text: responseText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Survey response submitted successfully");
      setResponseText("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit response");
    }
  };

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
              <p>Choose a survey and submit your response.</p>
            </div>
          </div>

          {surveys.length === 0 ? (
            <p>No surveys available.</p>
          ) : (
            surveys.map((survey) => (
              <div className="survey-card" key={survey.survey_id}>
                <div className="survey-icon">
                  <FaPoll />
                </div>

                <div className="survey-info">
                  <h3>{survey.title}</h3>
                  <p>{survey.description}</p>

                  <div className="survey-meta">
                    <span>Deadline: {formatDate(survey.deadline)}</span>
                    <span className="open-status">Open</span>
                  </div>
                </div>

                <button
                  className="submit-survey-btn"
                  onClick={() => {
                    setSelectedSurveyId(survey.survey_id);
                    window.scrollTo({ top: 250, behavior: "smooth" });
                  }}
                >
                  <FaPaperPlane /> Select
                </button>
              </div>
            ))
          )}
        </section>

        <aside className="survey-form-card">
          <h2>Submit Survey Response</h2>

          <label>Select Survey</label>
          <select
            value={selectedSurveyId}
            onChange={(e) => setSelectedSurveyId(e.target.value)}
          >
            {surveys.map((survey) => (
              <option key={survey.survey_id} value={survey.survey_id}>
                {survey.title}
              </option>
            ))}
          </select>

          <label>Your Feedback</label>
          <textarea
            placeholder="Write your feedback here..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          ></textarea>

          <button onClick={() => submitSurveyResponse()}>
            Submit Response
          </button>
        </aside>
      </main>

    </div>
  );
}

export default Surveys;