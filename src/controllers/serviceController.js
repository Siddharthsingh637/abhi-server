import prisma from "../prismaClient.js";

export const createServiceBooking = async (req, res, next) => {
  try {
    const { preferredDate, ...rest } = req.body;

    const data = {
      ...rest,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
    };

    const booking = await prisma.serviceBooking.create({ data });
    res.status(201).json({ success: true, booking });

  } catch (err) {
    next(err);
  }
};

