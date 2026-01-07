import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // MUST be false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false, // 🔑 THIS FIXES THE TIMEOUT
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export async function sendEnquiryMail({ name, phone, email, city, message }) {
  await transporter.sendMail({
    from: `"User Enquiry" <support@abhilashit.in>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email || undefined,
    subject: "New Website Enquiry",
    html: `
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Email:</b> ${email || "N/A"}</p>
      <p><b>City:</b> ${city || "N/A"}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  });
}
