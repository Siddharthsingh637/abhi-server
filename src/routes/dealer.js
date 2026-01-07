import express from "express";
import { createDealer } from "../controllers/dealerController.js";
const router = express.Router();

router.post("/", createDealer);

export default router;
