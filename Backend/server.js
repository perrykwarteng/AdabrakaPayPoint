import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import paymentRoutes from "./routes/payments.route.js";
import { connectDB } from "./config/db.config.js";

await connectDB();
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 1800;

// Payment Routes
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
});
