import connectDB from "../api/config/connect";
import taskRoutes from "../api/routes/task.routes";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

async function start() {
  await connectDB();
  const PORT = 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();
