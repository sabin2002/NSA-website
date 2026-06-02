import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminSurveyResponses.css";

function AdminSurveyResponses() {
  const [responses, setResponses] = useState([]);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchResponses = async () => {
    try {
      const res = await API.get("/survey-responses", {
        headers: getAuthHeader(),
      });
      setResponses(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch responses");
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <div className="admin-responses-page">
      <div className="admin-responses-header">
        <h1>Survey Responses</h1>
        <p>View student survey submissions.</p>
      </div>

      <div className="responses-card">
        <h2>All Responses</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Survey</th>
              <th>Student</th>
              <th>Email</th>
              <th>Response</th>
              <th>Submitted At</th>
            </tr>
          </thead>

          <tbody>
            {responses.length === 0 ? (
              <tr>
                <td colSpan="6">No responses found</td>
              </tr>
            ) : (
              responses.map((response) => (
                <tr key={response.response_id}>
                  <td>{response.response_id}</td>
                  <td>{response.survey_title}</td>
                  <td>{response.user_name}</td>
                  <td>{response.user_email}</td>
                  <td>{response.response_text}</td>
                  <td>{response.submitted_at?.slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSurveyResponses;