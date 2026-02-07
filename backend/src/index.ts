import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { loginHandler, meHandler, logoutHandler } from "./auth/auth.controller";
import { requireAuth } from "./auth/auth.middleware";
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

app.use(
  cors({
    origin: "http://localhost:3000",
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
  })
);
app.post("/auth/login", loginHandler);
app.post("/auth/logout", logoutHandler);
app.get("/auth/me", requireAuth, meHandler);
app.get("/cases", requireAuth, browseCasesHandler);
app.post("/cases", requireAuth, createCaseHandler);
app.get("/cases/:id", requireAuth, getCaseDetailHandler);
app.patch("/cases/:id", requireAuth, updateCaseHandler);
app.delete("/cases/:id", requireAuth, deleteCaseHandler);
app.post("/cases/:id/access/request", requireAuth, requestAccessHandler);
app.post("/cases/:id/access/withdraw", requireAuth, withdrawAccessHandler);
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
  downloadDocumentHandler
);
app.post("/cases/:id/access/grant", requireAuth, grantAccessHandler);
app.delete("/cases/:id/access/:lawyerId", requireAuth, revokeAccessHandler);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
