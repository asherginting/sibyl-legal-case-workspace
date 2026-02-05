import { Request, Response } from "express";
import {
  browseCases,
  getCaseDetail,
  requestAccess,
  withdrawAccess,
  createCase,
  updateCase,
  deleteCase,
} from "./cases.service";

export async function browseCasesHandler(req: Request, res: Response) {
  const user = (req as any).user;

  const result = await browseCases(req.query as any, user);
  return res.status(200).json(result);
}

export async function getCaseDetailHandler(req: Request, res: Response) {
  try {
    const caseId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const user = (req as any).user;

    const data = await getCaseDetail(caseId, user);

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

export async function requestAccessHandler(req: Request, res: Response) {
  try {
    const caseId = String(req.params.id);
    const user = (req as any).user;

    const result = await requestAccess(caseId, user);

    res.json({
      response_code: 200,
      response_message: result.message,
    });
  } catch (err: any) {
    res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message,
    });
  }
}

export async function withdrawAccessHandler(req: Request, res: Response) {
  try {
    const caseId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const user = (req as any).user;

    const result = await withdrawAccess(caseId, user);

    res.json({
      response_code: 200,
      response_message: result.message,
    });
  } catch (err: any) {
    res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || "Internal Server Error",
    });
  }
}

export async function createCaseHandler(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const { title, description, category, jurisdiction } = req.body;

    const legalCase = await createCase(
      { title, description, category, jurisdiction },
      user,
    );

    return res.status(201).json({
      response_code: 201,
      response_message: "Case created",
      data: {
        id: legalCase.id,
        title: legalCase.title,
        status: legalCase.status,
      },
    });
  } catch (err: any) {
    return res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || "Internal Server Error",
    });
  }
}

export async function updateCaseHandler(req: Request, res: Response) {
  try {
    const caseId = String(req.params.id);
    const user = (req as any).user;

    const { title, description, category, jurisdiction, status } = req.body;

    const result = await updateCase(
      caseId,
      { title, description, category, jurisdiction, status },
      user,
    );

    return res.json({
      response_code: 200,
      response_message: result.message,
    });
  } catch (err: any) {
    return res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || "Internal Server Error",
    });
  }
}

export async function deleteCaseHandler(req: Request, res: Response) {
  try {
    const caseId = String(req.params.id);
    const user = (req as any).user;

    const result = await deleteCase(caseId, user);

    return res.json({
      response_code: 200,
      response_message: result.message,
    });
  } catch (err: any) {
    return res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || "Internal Server Error",
    });
  }
}
