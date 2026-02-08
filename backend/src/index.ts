import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { loginHandler, meHandler, logoutHandler } from "./auth/auth.controller";
import { requireAuth } from "./auth/auth.middleware";
import rateLimit from "express-rate-limit";
import {
  browseCasesHandler,
  getCaseDetailHandler,
  requestAccessHandler,
  withdrawAccessHandler,
  createCaseHandler,
  updateCaseHandler,
  deleteCaseHandler,
  grantAccessHandler,
  revokeAccessHandler,
} from "./cases/cases.controller";
import {
  listDocumentsHandler,
  uploadDocumentHandler,
  downloadDocumentHandler,
} from "./documents/documents.controller";
import { upload } from "./documents/upload.middleware";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./docs/openapi";

dotenv.config();
const app = express();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  }),
);
app.post("/auth/login", loginLimiter, loginHandler);
app.post("/auth/logout", logoutHandler);
app.get("/auth/me", requireAuth, meHandler);
app.get("/cases", requireAuth, browseCasesHandler);
app.post("/cases", requireAuth, createCaseHandler);
app.get("/cases/:id", requireAuth, getCaseDetailHandler);
app.patch("/cases/:id", requireAuth, updateCaseHandler);
app.delete("/cases/:id", requireAuth, deleteCaseHandler);
app.post("/cases/:id/lawyer/request-access", requireAuth, requestAccessHandler);
app.delete(
  "/cases/:id/lawyer/withdraw-access",
  requireAuth,
  withdrawAccessHandler,
);
app.post("/cases/:id/client/grant-access", requireAuth, grantAccessHandler);
app.delete(
  "/cases/:id/client/revoke-access/:lawyerId",
  requireAuth,
  revokeAccessHandler,
);
app.get("/cases/:id/documents", requireAuth, listDocumentsHandler);
app.post(
  "/cases/:id/documents",
  requireAuth,
  upload.single("file"),
  uploadDocumentHandler,
);
app.get(
  "/cases/:id/documents/:documentId",
  requireAuth,
  downloadDocumentHandler,
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
