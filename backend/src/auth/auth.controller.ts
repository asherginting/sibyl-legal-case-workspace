import { Request, Response } from "express";
import { login } from "./auth.service";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const result = await login(email, password);

    res.cookie("auth_token", result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({
      response_code: 200,
      response_message: "Success",
      data: { user: result.user },
    });
  } catch {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}

export function meHandler(req: Request, res: Response) {
  return res.json({ user: (req as any).user });
}

export function logoutHandler(req: Request, res: Response) {
  res.clearCookie("auth_token");
  return res.status(204).send();
}
