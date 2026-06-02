import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to load profile");

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  if (error) {
    return (
      <div className="profile-page">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <h1>{profile.name || "N/A"}</h1>
          <p>{profile.role || "N/A"}</p>
        </div>

        <div className="profile-info">
          <div>
            <strong>Student ID:</strong>
            <span>{profile.student_id || "N/A"}</span>
          </div>

          <div>
            <strong>Name:</strong>
            <span>{profile.name || "N/A"}</span>
          </div>

          <div>
            <strong>Email:</strong>
            <span>{profile.email || "N/A"}</span>
          </div>

          <div>
            <strong>Phone:</strong>
            <span>{profile.ph_number || "N/A"}</span>
          </div>

          <div>
            <strong>Nationality:</strong>
            <span>{profile.nationality || "N/A"}</span>
          </div>

          <div>
            <strong>Department:</strong>
            <span>{profile.department || "N/A"}</span>
          </div>

          <div>
            <strong>Major:</strong>
            <span>{profile.major || "N/A"}</span>
          </div>

          <div>
            <strong>Enrollment Year:</strong>
            <span>{profile.enrollment_year || "N/A"}</span>
          </div>

          <div>
            <strong>Role:</strong>
            <span>{profile.role || "N/A"}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate("/home")}>Back to Home</button>

          {profile.role === "admin" && (
            <button onClick={() => navigate("/admin/dashboard")}>
              Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;