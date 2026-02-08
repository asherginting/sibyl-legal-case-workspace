import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, AuthUser } from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET!;

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded.sub || !decoded.role) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user: AuthUser = {
      id: decoded.sub,
      role: decoded.role,
    };

    (req as any).user = user;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
