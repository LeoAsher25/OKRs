import ValidationHelper from 'src/helpers/validation';
import { NextFunction, Request, Response } from "express"
import commonError from "src/helpers/common-error";
import { KeyResultRequestData } from 'src/types/objective.type';
import Objective from 'src/models/objective.model';
import objectiveError from 'src/helpers/objective-error';

const keyResultMiddleware = {
  async checkValidObjectiveId(req: Request, res: Response, next: NextFunction) {
    try {
      const { objectiveId } = req.params
      if (!ValidationHelper.objectId(objectiveId)) {
        throw commonError.invalidObjectId
      }
      const objective = await Objective.findOne({ _id: objectiveId }).lean()

      if (!objective) {
        throw objectiveError.objectiveNotFound
      }
      res.locals.objective = objective
      next()
    }
    catch (err) {
      next(err)
    }
  },

  async createKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const data: KeyResultRequestData = req.body;


      if (!data.name || !data.deadline) {
        throw commonError.requireFields;
      }
      if (!ValidationHelper.date(data.deadline)) {
        throw commonError.invalidDate
      }

      next()
    }
    catch (err) {
      next(err)
    }
  }
}

export default keyResultMiddleware