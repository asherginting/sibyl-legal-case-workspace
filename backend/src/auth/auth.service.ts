import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { JwtPayload } from "./auth.types";

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret is not defined");
}

const JWT_SECRET: Secret = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] = (process.env.JWT_EXPIRES_IN ??
  "15m") as SignOptions["expiresIn"];

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid Credentials");
  }

  const payload: JwtPayload = {
    sub: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}
