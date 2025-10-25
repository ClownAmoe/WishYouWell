import { Schema, model } from "mongoose";
import { ICard } from "./type";

const cardSchema = new Schema<ICard>({
  type: String,
  name_short: String,
  name: String,
  value: String,
  value_int: Number,
  suit: String,
  meaning_up: String,
  meaning_rev: String,
  desc: String,
  img: String,
});

const Card = model<ICard>("Card", cardSchema);
export default Card;
