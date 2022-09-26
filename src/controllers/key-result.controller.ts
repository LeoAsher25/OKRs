import { NextFunction, Request, Response } from "express"
import keyResultServices from "src/services/key-result.services"
import { KeyResultRequestData } from "src/types/objective.type"
import { StatusCodes } from "src/types/status-code.enum"

const keyResultController = {
  async createKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const data: KeyResultRequestData = req.body
      console.log("params: ", req.params)
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

  getOneKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyResult } = res.locals
      return res.status(StatusCodes.OK).json(keyResult)
    }
    catch (err) {
      next(err)
    }
  },

  async updateKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const data: KeyResultRequestData = req.body
      const { krId } = req.params
      const { objective } = res.locals
      const updatedObjective = await keyResultServices.update(objective, data, krId)

      return res.status(StatusCodes.OK).json({
        message: "Update key result successfully"
      })
    }
    catch (err) {
      next(err)
    }
  },

  async deleteKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { krId } = req.params
      const { objective } = res.locals
      await keyResultServices.delete(objective, krId)

      return res.status(StatusCodes.OK).json({
        message: "Delete key result successfully"
      })
    }
    catch (err) {
      next(err)
    }
  },


}

export default keyResultController