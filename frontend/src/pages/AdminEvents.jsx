import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminEvents.css";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      alert("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      location: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/events/${editingId}`, formData, {
          headers: getAuthHeader(),
        });

        alert("Event updated successfully");
      } else {
        await API.post("/events", formData, {
          headers: getAuthHeader(),
        });

        alert("Event created successfully");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Event operation failed");
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.event_id);

    setFormData({
      title: event.title || "",
      description: event.description || "",
      event_date: event.event_date ? event.event_date.slice(0, 10) : "",
      event_time: event.event_time || "",
      location: event.location || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/events/${id}`, {
        headers: getAuthHeader(),
      });

      alert("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className="admin-events-page">
      <div className="admin-events-header">
        <h1>Event Management</h1>
        <p>Create, view, update, and delete NSA events.</p>
      </div>

      <div className="admin-events-layout">
        <form className="event-form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Event" : "Create Event"}</h2>

          <label>Event Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            
          />

          <label>Event Date</label>
          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
          />

          <label>Event Time</label>
          <input
            type="time"
            name="event_time"
            value={formData.event_time}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />

          <button className="save-btn">
            {editingId ? "Update Event" : "Create Event"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <section className="events-table-card">
          <h2>All Events</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="6">No events found</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.event_id}>
                    <td>{event.event_id}</td>
                    <td>{event.title}</td>
                    <td>{event.event_date?.slice(0, 10)}</td>
                    <td>{event.event_time}</td>
                    <td>{event.location}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(event.event_id)}
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

export default AdminEvents;