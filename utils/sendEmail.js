const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, text }) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions, function(error) {
    if(error) {
      console.error(error)
    }
  });
}

module.exports = sendEmail;
