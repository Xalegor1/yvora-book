import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";

const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" })); // Увеличиваем лимит до 10MB
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

job.start();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
