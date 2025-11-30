import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt";
import userModels from "../models/user.models";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  console.log("Auth header:", req.headers.authorization);

  const token = header.split(" ")[1];

  try {
    const decoded: any = verifyToken(token);
    const user = await userModels.findById(decoded.id);

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
