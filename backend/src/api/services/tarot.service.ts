import { sleep } from "../../utils/sleep";
import CardModel from "../models/card.model";

export async function describeWithHF(cards: string[]): Promise<string[]> {
  const descriptions: string[] = [];

  for (const cardName of cards) {
    const card = await CardModel.findOne({ name: cardName });
    const desc = card ? card.value : `No description for ${cardName}`;

    descriptions.push(desc);

    await sleep(5000);
  }

  return descriptions;
}
