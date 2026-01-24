import prisma from "../lib/prisma.js";
import {sendSubDealerMail} from "../utils/subdealerMailer.js";

export const createDealer = async (req, res, next) => {
  try {
    const payload = req.body;
    
    // Save to database
    const lead = await prisma.subDealerLead.create({ data: payload });
    
    // Respond immediately to client
    res.status(201).json({ 
      success: true, 
      message: "Sub dealer application submitted successfully",
      lead 
    });

    // Send email in background
    sendSubDealerMail({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      company: lead.company,
      city: lead.city,
      message: lead.message,
      experience: lead.experience,
    }).catch(err => {
      console.error("Sub dealer mail error:", err);
    });

  } catch (err) { 
    next(err); 
  }
};
