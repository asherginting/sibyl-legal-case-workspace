import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      const storedName = `${randomUUID()}${path.extname(file.originalname)}`;
      cb(null, storedName);
    },
  }),
  limits: {
    fileSize: MAX_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(new Error("Invalid File Type"));
      return;
    }
    cb(null, true);
  },
});
