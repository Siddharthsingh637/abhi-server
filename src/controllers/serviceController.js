// import prisma from "../prismaClient.js";
import prisma from "../lib/prisma.js";
import { sendServiceBookingMail } from "../utils/serviceMailer.js";

export const createServiceBooking = async (req, res, next) => {
  try {
    const { preferredDate, vehicleModel, ...rest } = req.body;

    const data = {
      ...rest,
      vehicleSlug: vehicleModel,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
    };

    const booking = await prisma.serviceBooking.create({ data });

    // respond immediately
    res.status(201).json({
      success: true,
      message: "Service appointment booked",
      booking,
    });

    // send mail in background
    sendServiceBookingMail({
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      vehicleModel: booking.vehicleSlug,
      serviceType: booking.serviceType,
      preferredDate: booking.preferredDate,
      comments: booking.comments,
    }).catch(err => {
      console.error("Service mail error:", err);
    });

  } catch (err) {
    next(err);
  }
};
