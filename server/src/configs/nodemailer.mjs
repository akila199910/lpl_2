import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,          // smtp.sendgrid.net
  port: Number(process.env.MAIL_PORT),  // 465
  secure: true,                         // true for port 465, false for 587
  auth: {
    user: process.env.MAIL_USERNAME,    // literally "apikey"
    pass: process.env.SENDGRID_API_KEY, // your actual SendGrid API key
  },
  logger: true, // Optional: logs SMTP activity to console
  debug: true,  // Optional: logs connection details
  tls: {
    rejectUnauthorized: true, // Enforces valid SSL certificate (keep true for production)
  },
  family: 4 // Use IPv4 to avoid `::1` (IPv6) issues
});

export default transport;
