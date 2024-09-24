import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",

  port: 587,
  host: process.env.HOST,
  secure: false,
  logger: true,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
    authMethod: "PLAIN",
  },
  secureConnection: false,

  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, from, replyTo, message) => {
  try {
    const mailOptions = {
      from,
      to,
      replyTo,
      subject: "Test Email",
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
