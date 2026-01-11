import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import modelsRouter from "./routes/models.js";
import serviceRouter from "./routes/service.js";
import dealerRouter from "./routes/dealer.js";
import errorHandler from "./middleware/errorHandler.js";
import enquiryRouter from "./routes/enquiry.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// routes
app.use("/api/models", modelsRouter);
app.use("/api/service-booking", serviceRouter);
app.use("/api/sub-dealer", dealerRouter);
app.use("/api/enquiry", enquiryRouter);


// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
