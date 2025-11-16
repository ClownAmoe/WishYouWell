import dotenv from "dotenv";
import express from "express";
import connectDB from "../api/config/connect.js";
import taskRoutes from "../api/routes/task.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

async function start() {
  await connectDB();

  const PORT = process.env.WORKER_PORT;

  app.listen(PORT, () => {
    console.log(`Worker PID ${process.pid} running on port ${PORT}`);
  });
}

start();
