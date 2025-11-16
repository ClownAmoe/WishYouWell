import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/connect";

// імпортуємо роут
import cardsRouter from "./routes/cards.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cards", cardsRouter);

const PORT = process.env.PORT;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
  });
}

start();
