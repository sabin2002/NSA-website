import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminJobApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/job-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (error) {
      alert("Failed to fetch applications");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Job Applications</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Job</th>
            <th>Student</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Message</th>
            <th>Applied At</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.application_id}>
              <td>{app.job_title}</td>
              <td>{app.student_name}</td>
              <td>{app.student_id}</td>
              <td>{app.email}</td>
              <td>{app.message}</td>
              <td>
                {new Date(app.applied_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobApplications;