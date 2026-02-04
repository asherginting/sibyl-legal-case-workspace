import { Request, Response } from 'express'
import { browseCases } from './cases.service'

export async function browseCasesHandler(req: Request, res: Response) {
  const user = (req as any).user

  const result = await browseCases(req.query as any, user)
  return res.status(200).json(result)
}
