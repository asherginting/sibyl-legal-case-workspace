import { Request, Response } from "express";
import { listDocuments, uploadDocument, downloadDocument } from "./documents.service";

export async function listDocumentsHandler(req: Request, res: Response) {
  try {
    const caseId = String(req.params.id);
    const user = (req as any).user;

    const data = await listDocuments(caseId, user);

    res.json({
      response_code: 200,
      response_message: "Success",
      data,
    });
  } catch (err: any) {
    res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || "Internal Server Error",
    });
  }
}

export async function uploadDocumentHandler(req: Request, res: Response) {
  try {
    const caseId = String(req.params.id);
    const user = (req as any).user;
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({
        response_code: 400,
        response_message: "FILE_REQUIRED",
      });
    }

    const result = await uploadDocument(caseId, file, user);

    res.status(201).json({
      response_code: 201,
      response_message: result.message,
    });
  } catch (err: any) {
    res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || "Internal Server Error",
    });
  }
}

export async function downloadDocumentHandler(req: Request, res: Response) {
  try {
    const documentId = String(req.params.id)
    const user = (req as any).user

    const { filePath, originalName } = await downloadDocument(
      documentId,
      user
    )

    res.download(filePath, originalName)
  } catch (err: any) {
    res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || 'Internal Server Error',
    })
  }
}

