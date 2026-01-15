// import prisma from "../prismaClient.js";
import prisma from "../lib/prisma.js";

export const createDealer = async (req, res, next) => {
  try {
    const payload = req.body;
    const lead = await prisma.subDealerLead.create({ data: payload });
    res.status(201).json({ success: true, lead });
  } catch (err) { next(err); }
};
