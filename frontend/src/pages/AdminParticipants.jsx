import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminParticipants() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const res = await API.get("/event-registrations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setParticipants(res.data);
    } catch (err) {
      alert("Failed to load participants");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Event Participants</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Student</th>
            <th>Email</th>
            <th>Registered At</th>
          </tr>
        </thead>

        <tbody>
          {participants.length === 0 ? (
            <tr>
              <td colSpan="5">No registrations found</td>
            </tr>
          ) : (
            participants.map((p) => (
              <tr key={p.registration_id}>
                <td>{p.registration_id}</td>
                <td>{p.event_title}</td>
                <td>{p.user_name}</td>
                <td>{p.email}</td>
                <td>
                  {new Date(p.registered_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminParticipants;