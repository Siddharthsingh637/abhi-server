import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import modelsRouter from "./routes/models.js";
import serviceRouter from "./routes/service.js";
import dealerRouter from "./routes/dealer.js";
import enquiryRouter from "./routes/enquiry.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

/**
 * CORS
 * Allow your frontend domain + localhost
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://abhilashit.in",
      "https://www.abhilashit.in"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

/**
 * Health check (VERY IMPORTANT for Hostinger debugging)
 */
app.get("/", (req, res) => {
  res.send("Backend is alive 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

/**
 * Routes
 */
app.use("/api/models", modelsRouter);
app.use("/api/service-booking", serviceRouter);
app.use("/api/sub-dealer", dealerRouter);
app.use("/api/enquiry", enquiryRouter);

/**
 * Error handler (keep last)
 */
app.use(errorHandler);

/**
 * Hostinger REQUIRED listen config
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
});
