import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export async function registerController(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    const { user, token } = await registerUser(email, password, name);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
