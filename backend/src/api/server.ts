import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/connect";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", imagine: "testOne" });
});

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
  });
}

start();
