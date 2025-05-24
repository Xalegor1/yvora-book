import "dotenv/config";
import express from "express";
import bodyParser from "body-parser"; // Импорт body-parser как ES-модуль
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка body-parser с увеличенным лимитом
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Запуск cron-задания
job.start();

// Middleware
app.use(express.json()); // Уже включено в body-parser.json, но оставлено для явности
app.use(cors());

// Маршруты
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
