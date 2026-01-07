import prisma from "../prismaClient.js";

export const listModels = async (req, res, next) => {
  try {
    const models = await prisma.scooterModel.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(models);
  } catch (err) { next(err); }
};

export const getModel = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const model = await prisma.scooterModel.findUnique({ where: { slug } });
    if (!model) return res.status(404).json({ error: "Not found" });
    res.json(model);
  } catch (err) { next(err); }
};

export const updateModel = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = req.body; // expect { price, stock, ... }
    const updated = await prisma.scooterModel.update({
      where: { id },
      data,
    });
    res.json(updated);
  } catch (err) { next(err); }
};
