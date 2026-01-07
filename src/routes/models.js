import express from "express";
import { listModels, getModel, updateModel } from "../controllers/modelsController.js";
const router = express.Router();

router.get("/", listModels);
router.get("/:slug", getModel);
router.patch("/:id", updateModel); // protect later

export default router;
