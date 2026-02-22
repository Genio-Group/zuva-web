import nodemailer from 'nodemailer';

const email = process.env.SMTP_EMAIL;
const pass = process.env.SMTP_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: email,
    pass: pass,
  },
  // Add connection timeout settings
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const mailOptions = {
  from: email,
};
