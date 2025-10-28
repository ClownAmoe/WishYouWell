import path from "path";
import fs from "fs";

import Card from "./Card.js";
import connectDB from "./connect.js";

const seedCards = async () => {
  await connectDB();

  try {
    const filePath = path.join(process.cwd(), "src/db", "tarot.json");
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
