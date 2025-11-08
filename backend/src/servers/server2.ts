import express from "express";
import dotenv from "dotenv";
import connectDB from "../api/config/connect";
import taskRoutes from "../api/routes/task.routes";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

async function start() {
  await connectDB();
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();
