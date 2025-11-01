import { Request, Response } from "express";
import CardModel from "../models/card.model";

export const getCards = async (_req: Request, res: Response) => {
  const cards = await CardModel.find();
  res.json(cards);
};

export const createCard = async (req: Request, res: Response) => {
  const newCard = await CardModel.create(req.body);
  res.status(201).json(newCard);
};
