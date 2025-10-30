export interface ICard extends Document {
  type: string;
  name_short: string;
  name: string;
  value: string;
  value_int: number;
  suit: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
  img: string;
}
