import { Request, Response } from "express";
import { login } from "./auth.service";

const isProd = process.env.NODE_ENV === "production";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const result = await login(email, password);

    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
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

export function logoutHandler(req: Request, res: Response) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  return res.status(204).send();
}
