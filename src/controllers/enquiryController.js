import { sendEnquiryMail } from "../utils/mailer.js";

export const submitEnquiry = async (req, res) => {
  const { name, phone, email, city, message } = req.body;

  // Validation
  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, phone and message are required",
    });
  }

  // Respond immediately (IMPORTANT)
  res.status(200).json({
    success: true,
    message: "Enquiry received",
  });

  // Send email in background (NO throw)
  sendEnquiryMail({ name, phone, email, city, message })
    .then(() => console.log("Enquiry email sent"))
    .catch((err) => {
      // log only, NEVER respond again
      console.error("Email send failed:", err.message);
    });
};
