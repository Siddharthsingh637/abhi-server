import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.HOST || "smtp.hostinger.com",
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

export const sendServiceBookingMail = async ({
  name,
  phone,
  email,
  vehicleModel,
  serviceType,
  preferredDate,
  comments,
}) => {
  const formattedDate = preferredDate
    ? new Date(preferredDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not specified";

  // Send email to support
  const supportMail = await transporter.sendMail({
    from: `"Service Appointment" <support@abhilashit.in>`,
    to: "support@abhilashit.in",
    subject: "🛠️ Service Appointment Request",
    html: `
    <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      
      <div style="background:#0f766e;padding:20px;">
        <h2 style="color:#fff;margin:0;">Service Appointment</h2>
        <p style="color:#ccfbf1;margin-top:6px;font-size:13px;">
          New service request from website
        </p>
      </div>

      <div style="padding:24px;font-size:14px;color:#111827;">
        <table width="100%" cellpadding="6">
          <tr><td><b>Name</b></td><td>${name}</td></tr>
          <tr><td><b>Phone</b></td><td>${phone}</td></tr>
          <tr><td><b>Email</b></td><td>${email || "N/A"}</td></tr>
          <tr><td><b>Vehicle</b></td><td>${vehicleModel || "N/A"}</td></tr>
          <tr><td><b>Service Type</b></td><td>${serviceType || "N/A"}</td></tr>
          <tr><td><b>Preferred Date</b></td><td>${formattedDate}</td></tr>
        </table>

        <div style="margin-top:16px;">
          <p><b>Comments</b></p>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
            ${comments || "No additional comments"}
          </div>
        </div>
      </div>

      <div style="background:#f1f5f9;padding:12px;text-align:center;font-size:12px;color:#64748b;">
        Abhilashit Automobiles – Service Desk
      </div>

    </div>
    `,
  });

  // Send auto-reply to customer if email is provided
  if (email) {
    await transporter.sendMail({
      from: `"Abhilashit Automobiles" <support@abhilashit.in>`,
      to: email,
      subject: "✅ Service Booking Confirmation",
      html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        
        <div style="background:#0f766e;padding:20px;">
          <h2 style="color:#fff;margin:0;">Service Booking Confirmed</h2>
          <p style="color:#ccfbf1;margin-top:6px;font-size:13px;">
            Thank you for choosing Abhilashit Automobiles
          </p>
        </div>

        <div style="padding:24px;font-size:14px;color:#111827;">
          <p>Dear ${name},</p>
          <p>We have received your service booking request. Our team will contact you shortly to confirm the appointment details.</p>
          
          <table width="100%" cellpadding="6" style="margin-top:16px;">
            <tr><td><b>Name</b></td><td>${name}</td></tr>
            <tr><td><b>Phone</b></td><td>${phone}</td></tr>
            <tr><td><b>Email</b></td><td>${email}</td></tr>
            <tr><td><b>Vehicle</b></td><td>${vehicleModel || "N/A"}</td></tr>
            <tr><td><b>Service Type</b></td><td>${serviceType || "N/A"}</td></tr>
            <tr><td><b>Preferred Date</b></td><td>${formattedDate}</td></tr>
          </table>

          <div style="margin-top:16px;">
            <p><b>Your Comments</b></p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
              ${comments || "No additional comments"}
            </div>
          </div>

          <p style="margin-top:16px;">If you have any questions, please contact us at support@abhilashit.in or call us directly.</p>
          <p>Best regards,<br>Abhilashit Automobiles Team</p>
        </div>

        <div style="background:#f1f5f9;padding:12px;text-align:center;font-size:12px;color:#64748b;">
          Abhilashit Automobiles – Your Trusted Service Partner
        </div>

      </div>
      `,
    });
  }

  return supportMail;
};
