import { NextFunction, Request, Response } from 'express';
import commonError from 'src/helpers/common-error';
import objectiveError from 'src/helpers/objective-error';
import ValidationHelper from 'src/helpers/validation';
import Objective from 'src/models/objective.model';
import { RequestWithUser } from 'src/types/auth.type';
import { ObjectiveRequestData, ObjectiveType } from 'src/types/objective.type';

const objectiveMiddleware = {
  async checkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ObjectiveRequestData = req.body;
      if (!data.name || !data.type || !data.deadline) {
        throw commonError.requireFields;
      }
      if (!ValidationHelper.date(data.deadline)) {
        throw commonError.invalidDate;
      }
      if (Object.values(ObjectiveType).every(type => type !== data.type)) {
        throw objectiveError.typeIsInvalid;
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  async checkValidObjectiveId(req: Request, res: Response, next: NextFunction) {
    try {
      const { objectiveId } = req.params;

      if (!ValidationHelper.objectId(objectiveId)) {
        throw commonError.invalidObjectId;
      }
      const objective = await Objective.findOne({ _id: objectiveId }).lean();

      if (!objective) {
        throw objectiveError.objectiveNotFound;
      }
      res.locals.objective = objective;
      next();
    } catch (err) {
      next(err);
    }
  }
};
export default objectiveMiddleware;
