import { PrismaClient, UserRole, CaseAccessStatus } from "@prisma/client";
import type { UploadedFile } from "./document.types";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function listDocuments(
  caseId: string,
  user: { id: string; role: UserRole },
) {
  const legalCase = await prisma.case.findUnique({
    where: { id: caseId },
    include: {
      access: {
        where: {
          lawyerId: user.id,
          status: CaseAccessStatus.GRANTED,
        },
      },
    },
  });

  if (!legalCase) {
    throw { status: 404, message: "Case Not Found" };
  }

  const isOwner = legalCase.ownerId === user.id;
  const hasAccess = legalCase.access.length > 0;

  if (!isOwner && !hasAccess) {
    throw { status: 403, message: "Forbidden" };
  }

  const documents = await prisma.document.findMany({
    where: { caseId },
    include: {
      uploadedBy: {
        select: {
          id: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return documents.map((d) => ({
    id: d.id,
    originalName: d.originalName,
    mimeType: d.mimeType,
    size: d.size,
    uploadedBy: d.uploadedBy,
    createdAt: d.createdAt,
  }));
}

export async function uploadDocument(
  caseId: string,
  file: UploadedFile,
  user: { id: string; role: UserRole },
) {
  const legalCase = await prisma.case.findUnique({
    where: { id: caseId },
    include: {
      access: {
        where: {
          lawyerId: user.id,
          status: CaseAccessStatus.GRANTED,
        },
      },
    },
  });

  if (!legalCase) {
    throw { status: 404, message: "Case Not Found" };
  }

  const isOwner = legalCase.ownerId === user.id;
  const hasAccess = legalCase.access.length > 0;

  if (!isOwner && !hasAccess) {
    throw { status: 403, message: "Forbidden" };
  }

  await prisma.document.create({
    data: {
      caseId,
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      uploadedById: user.id,
    },
  });

  return { message: "Document uploaded" };
}

export async function downloadDocument(
  documentId: string,
  user: { id: string; role: UserRole },
) {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: {
      case: {
        include: {
          access: {
            where: {
              lawyerId: user.id,
              status: CaseAccessStatus.GRANTED,
            },
          },
        },
      },
    },
  });

  if (!document) {
    throw { status: 404, message: "Document Not Found" };
  }

  const legalCase = document.case;
  const isOwner = legalCase.ownerId === user.id;
  const hasAccess = legalCase.access.length > 0;

  if (!isOwner && !hasAccess) {
    throw { status: 403, message: "Forbidden" };
  }

  const filePath = path.join(process.cwd(), "uploads", document.storedName);

  if (!fs.existsSync(filePath)) {
    throw { status: 404, message: "File Not Found" };
  }

  return {
    filePath,
    originalName: document.originalName,
  };
}
