const db = require("../config/db");

// Student Register
exports.registerEvent = (req, res) => {
  const { event_id } = req.body;

  const sql = `
    INSERT INTO event_registrations
    (event_id, user_id)
    VALUES (?, ?)
  `;

  db.query(sql, [event_id, req.user.user_id], (err, result) => {
    if (err) {
      console.log(err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "Already registered for this event",
        });
      }

      return res.status(500).json({
        message: "Failed to register",
      });
    }

    res.status(201).json({
      message: "Registered successfully",
    });
  });
};

// Admin View All Registrations
exports.getAllRegistrations = (req, res) => {
  const sql = `
    SELECT
      er.registration_id,
      e.title AS event_title,
      u.name AS user_name,
      u.email,
      er.registered_at
    FROM event_registrations er
    JOIN events e ON er.event_id = e.event_id
    JOIN users u ON er.user_id = u.user_id
    ORDER BY er.registered_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to fetch registrations",
      });
    }

    res.status(200).json(result);
  });
};

// Admin View Participants By Event
exports.getEventParticipants = (req, res) => {
  const { eventId } = req.params;

  const sql = `
    SELECT
      u.user_id,
      u.name,
      u.email,
      er.registered_at
    FROM event_registrations er
    JOIN users u ON er.user_id = u.user_id
    WHERE er.event_id = ?
    ORDER BY er.registered_at DESC
  `;

  db.query(sql, [eventId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to fetch participants",
      });
    }

    res.status(200).json(result);
  });
};