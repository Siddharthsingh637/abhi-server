import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: Number(process.env.EMAIL_PORT) === 465,
  pool: true,               // ⭐ IMPORTANT (speed)
  maxConnections: 1,
  maxMessages: 10,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEnquiryMail({ name, phone, email, city, message }) {
  await transporter.sendMail({
  from: `"Abhilashit Enquiry" <support@abhilashit.in>`,
  to: "support@abhilashit.in",
  subject: "🚨 New Website Enquiry Received",
  html: `
  <div style="max-width:600px;margin:auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    
    <div style="background:#0f766e;padding:20px;">
      <h2 style="color:#ffffff;margin:0;font-size:20px;">New Enquiry Received</h2>
      <p style="color:#ccfbf1;margin:6px 0 0;font-size:13px;">
        Abhilashit Automobiles – Website
      </p>
    </div>

    <div style="padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#111827;">
        <tr>
          <td style="padding:8px 0;font-weight:600;">Name</td>
          <td style="padding:8px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:600;">Phone</td>
          <td style="padding:8px 0;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:600;">Email</td>
          <td style="padding:8px 0;">${email || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:600;">City</td>
          <td style="padding:8px 0;">${city || "N/A"}</td>
        </tr>
      </table>

      <div style="margin-top:20px;">
        <p style="font-weight:600;margin-bottom:6px;">Message</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;font-size:14px;line-height:1.6;">
          ${message || "No message provided"}
        </div>
      </div>
    </div>

    <div style="background:#f1f5f9;padding:14px;text-align:center;font-size:12px;color:#64748b;">
      This enquiry was submitted from abhilashit.in
    </div>

  </div>
  `,
});

  await transporter.sendMail({
  from: `"Abhilashit Automobiles" <support@abhilashit.in>`,
  to: email,
  subject: "✅ We’ve received your enquiry",
  html: `
  <div style="max-width:600px;margin:auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

    <div style="background:#0f766e;padding:22px;text-align:center;">
      <h2 style="color:#ffffff;margin:0;font-size:22px;">
        Thank you for reaching out!
      </h2>
    </div>

    <div style="padding:24px;color:#111827;font-size:14px;line-height:1.7;">
      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Thank you for contacting <strong>Abhilashit Automobiles</strong>.
        We’ve received your enquiry and our team will get in touch with you shortly.
      </p>

      <div style="margin:20px 0;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;">
        <p style="margin:0 0 8px;font-weight:600;">Your details</p>
        <p style="margin:0;">📞 Phone: ${phone}</p>
        ${city ? `<p style="margin:0;">📍 City: ${city}</p>` : ""}
      </div>

      <p>
        If your enquiry is urgent, feel free to reply to this email or visit our showroom.
      </p>

      <p style="margin-top:24px;">
        Warm regards,<br/>
        <strong>Abhilashit Automobiles</strong><br/>
        <span style="color:#64748b;">Premium Electric Mobility</span>
      </p>
    </div>

    <div style="background:#f1f5f9;padding:14px;text-align:center;font-size:12px;color:#64748b;">
      © ${new Date().getFullYear()} Abhilashit Automobiles
    </div>

  </div>
  `,
});
}

