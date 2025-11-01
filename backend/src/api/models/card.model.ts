import { Schema, model } from "mongoose";
import { ICard } from "../types/card";

const CardSchema = new Schema<ICard>({
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

const CardModel = model<ICard>("Card", CardSchema);
export default CardModel;
