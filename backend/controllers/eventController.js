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

      res.status(201).json({ message: "Event created successfully" });
    }
  );
};

// Get All Events
exports.getEvents = (req, res) => {
  const sql = "SELECT * FROM events ORDER BY event_date ASC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch events" });
    }

    res.status(200).json(result);
  });
};