import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const fromEmail = process.env.SES_FROM_EMAIL || "support@abhilashit.in";

export const sendSubDealerMail = async ({
  name,
  phone,
  email,
  company,
  city,
  message,
  experience,
}) => {
  // Send email to support
  const supportHtmlContent = `
    <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      
      <div style="background:#0f766e;padding:20px;">
        <h2 style="color:#fff;margin:0;">New Sub Dealer Lead</h2>
        <p style="color:#ccfbf1;margin-top:6px;font-size:13px;">
          New sub-dealer inquiry from website
        </p>
      </div>

      <div style="padding:24px;font-size:14px;color:#111827;">
        <table width="100%" cellpadding="6">
          <tr><td><b>Name</b></td><td>${name}</td></tr>
          <tr><td><b>Phone</b></td><td>${phone}</td></tr>
          <tr><td><b>Email</b></td><td>${email || "N/A"}</td></tr>
          ${company ? `<tr><td><b>Company</b></td><td>${company}</td></tr>` : ""}
          <tr><td><b>City</b></td><td>${city || "N/A"}</td></tr>
          ${experience ? `<tr><td><b>Experience</b></td><td>${experience}</td></tr>` : ""}
        </table>

        <div style="margin-top:16px;">
          <p><b>Message</b></p>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
            ${message || "No message provided"}
          </div>
        </div>
      </div>

      <div style="background:#f1f5f9;padding:12px;text-align:center;font-size:12px;color:#64748b;">
        Abhilashit Automobiles – Partnership Team
      </div>

    </div>
    `;

  const supportEmailParams = {
    Source: `Sub Dealer Inquiry <${fromEmail}>`,
    Destination: {
      ToAddresses: ["support@abhilashit.in"],
    },
    Message: {
      Subject: {
        Data: "🤝 New Sub Dealer Lead Received",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: supportHtmlContent,
          Charset: "UTF-8",
        },
      },
    },
  };

  let supportMail;
  try {
    supportMail = await sesClient.send(new SendEmailCommand(supportEmailParams));
  } catch (error) {
    console.error("Error sending support email:", error);
    throw error;
  }

  // Send auto-reply to applicant if email is provided
  if (email) {
    const customerHtmlContent = `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        
        <div style="background:#0f766e;padding:20px;">
          <h2 style="color:#fff;margin:0;">Thank You for Your Interest</h2>
          <p style="color:#ccfbf1;margin-top:6px;font-size:13px;">
            Sub Dealer Partnership Application
          </p>
        </div>

        <div style="padding:24px;font-size:14px;color:#111827;">
          <p>Dear ${name},</p>
          <p>Thank you for your interest in becoming a sub-dealer partner with Abhilashit Automobiles. We have received your application and appreciate your enthusiasm.</p>
          
          <p>Our partnership team will review your application and contact you within 2-3 business days with next steps and opportunities.</p>

          <div style="margin-top:16px;padding:12px;background:#f0f9ff;border-left:4px solid #0f766e;">
            <p style="margin:0;font-weight:bold;">Your Application Details:</p>
            <p style="margin:8px 0 0;font-size:13px;">📞 Phone: ${phone}</p>
            ${city ? `<p style="margin:8px 0 0;font-size:13px;">📍 City: ${city}</p>` : ""}
            ${company ? `<p style="margin:8px 0 0;font-size:13px;">🏢 Company: ${company}</p>` : ""}
            ${experience ? `<p style="margin:8px 0 0;font-size:13px;">💼 Experience: ${experience}</p>` : ""}
          </div>

          <p style="margin-top:16px;">If you have any questions in the meantime, feel free to reach out to us at support@abhilashit.in.</p>
          <p>Best regards,<br><strong>Abhilashit Automobiles</strong><br>Partnership Development Team</p>
        </div>

        <div style="background:#f1f5f9;padding:12px;text-align:center;font-size:12px;color:#64748b;">
          Abhilashit Automobiles – Premium Electric Mobility
        </div>

      </div>
      `;

    const customerEmailParams = {
      Source: `Abhilashit Automobiles <${fromEmail}>`,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: "✅ Sub Dealer Application Received",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: customerHtmlContent,
            Charset: "UTF-8",
          },
        },
      },
    };

    try {
      await sesClient.send(new SendEmailCommand(customerEmailParams));
    } catch (error) {
      console.error("Error sending customer confirmation email:", error);
      throw error;
    }
  }

  return supportMail;
};
