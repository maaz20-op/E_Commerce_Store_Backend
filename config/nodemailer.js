import nodemailer from "nodemailer";
import dotenv from "dotenv";

console.log("444444444",process.env.EMAIL_HOST)
// Create transporter
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Gmail
    pass: process.env.EMAIL_PASS, // App Password
  },
});


// Verify transporter connection
transporter.verify((err, success) => {
  if (err) console.log("Email transporter error:", err);
  else console.log("Email transporter ready");
});
