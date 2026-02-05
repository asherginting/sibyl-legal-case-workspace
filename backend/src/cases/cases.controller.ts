import { Request, Response } from 'express'
import { browseCases, getCaseDetail  } from './cases.service'

export async function browseCasesHandler(req: Request, res: Response) {
  const user = (req as any).user

  const result = await browseCases(req.query as any, user)
  return res.status(200).json(result)
}

export async function getCaseDetailHandler(req: Request, res: Response) {
  try {
    const caseId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const user = (req as any).user

    const data = await getCaseDetail(caseId, user)

    res.json({
      response_code: 200,
      response_message: 'Success',
      data,
    })
  } catch (err: any) {
    res.status(err.status || 500).json({
      response_code: err.status || 500,
      response_message: err.message || 'Internal Server Error',
    })
  }
}
