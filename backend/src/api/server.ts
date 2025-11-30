import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/connect";

import cardsRouter from "./routes/cards.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/cards", cardsRouter);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
  });
}

start();
