const db = require("../config/db");

// Create Event
exports.createEvent = (req, res) => {
  const { title, description, event_date, event_time, location } = req.body;

  const sql = `
    INSERT INTO events 
    (created_by_user_id, title, description, event_date, event_time, location)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.user.user_id, title, description, event_date, event_time, location],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create event" });
      }

      res.status(201).json({
        message: "Event created successfully",
        event_id: result.insertId,
      });
    }
  );
};

// Get Events
exports.getEvents = (req, res) => {
  const sql = "SELECT * FROM events ORDER BY event_date ASC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch events" });
    }

    res.status(200).json(result);
  });
};

// Update Event
exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const { title, description, event_date, event_time, location } = req.body;

  const sql = `
    UPDATE events
    SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?
    WHERE event_id = ?
  `;

  db.query(
    sql,
    [title, description, event_date, event_time, location, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update event" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json({ message: "Event updated successfully" });
    }
  );
};

// Delete Event
exports.deleteEvent = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM events WHERE event_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete event" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  });
};