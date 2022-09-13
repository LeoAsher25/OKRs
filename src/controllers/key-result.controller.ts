import { NextFunction, Request, Response } from "express"
import keyResultServices from "src/services/key-result.services"
import { KeyResultRequestData } from "src/types/objective.type"
import { StatusCodes } from "src/types/status-code.enum"

const keyResultController = {
  async createKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const data: KeyResultRequestData = req.body
      const { objective } = res.locals
      const updatedObjective = await keyResultServices.create(objective, data)

      return res.status(StatusCodes.OK).json({
        message: "Create objective successfully"
      })

    }
    catch (err) {
      next(err)
    }

  },
  async getAllKeyResults(req: Request, res: Response, next: NextFunction) {
    try {
      const { objective } = res.locals
      return res.status(StatusCodes.OK).json(objective.keyResults)
    }
    catch (err) {
      next(err)
    }
  },


}

export default keyResultController