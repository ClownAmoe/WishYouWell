import { signToken } from "../../utils/jwt";
import userModels from "../models/user.models";

export async function registerUser(
  email: string,
  password: string,
  name: string
) {
  const existing = await userModels.findOne({ email });
  if (existing) throw new Error("User already exists");

  const user = await userModels.create({ email, password, name });
  const token = signToken({ id: user._id, email: user.email });

  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user: any = await userModels.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signToken({ id: user._id, email: user.email });

  return { user, token };
}
