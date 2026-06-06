const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_PORT:", process.env.SMTP_PORT);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP Connection Verified");
  } catch (err) {
    console.log("❌ SMTP Verify Error:");
    console.log(err);
    throw err;
  }

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;