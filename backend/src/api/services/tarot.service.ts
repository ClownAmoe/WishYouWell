import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN;
const HF_MODEL = process.env.HF_MODEL;

export async function describeWithHF(
  cards: string[],
  category?: string
): Promise<string[]> {
  const prompt = `Опиши картку Таро "${cards[0]}" у категорії "${category}". Коротко, українською.`;
  const response = await axios.post(
    `https://api-inference.huggingface.co/models/${HF_MODEL}`,
    { inputs: prompt, options: { wait_for_model: true } },
    { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
  );

  return [response.data[0]?.generated_text || ""];
}
