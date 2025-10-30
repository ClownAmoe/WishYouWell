import path from "path";
import fs from "fs";

import connectDB from "../config/connect.js";
import Card from "../models/Card.js";

const seedCards = async () => {
  await connectDB();

  try {
    const filePath = path.join(process.cwd(), "./data", "tarot.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await Card.deleteMany({});

    for (const card of jsonData.cards) {
      await Card.create(card);
    }
    console.log("✅ Cards seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding cards:", err);
    process.exit(1);
  }
};

seedCards();

export default seedCards;
