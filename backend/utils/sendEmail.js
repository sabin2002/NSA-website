const axios = require("axios");

const sendEmail = async (to, subject, text) => {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: process.env.BREVO_SENDER_NAME || "NSA Website",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};

module.exports = sendEmail;