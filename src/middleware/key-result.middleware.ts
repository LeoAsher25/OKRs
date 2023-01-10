import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import commonError from 'src/helpers/common-error';
import objectiveError from 'src/helpers/objective-error';
import ValidationHelper from 'src/helpers/validation';
import Objective from 'src/models/objective.model';
import { KeyResultRequestData, ObjectiveDto } from 'src/types/objective.type';

const keyResultMiddleware = {
  async checkGetOneKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { objectiveId, krId } = req.params;
      if (!ValidationHelper.objectId(krId)) {
        throw commonError.invalidObjectId;
      }

      const objective = await Objective.findOne(
        {
          _id: new mongoose.Types.ObjectId(objectiveId)
        },
        {
          keyResults: {
            $filter: {
              input: '$keyResults',
              as: 'keyResults',
              cond: { $eq: ['$$keyResults._id', new mongoose.Types.ObjectId(krId)] }
            },
            $project: {
              commits: 0,
              updatedAt: 0,
              createdAt: 0
            }
          }
        }
      );

      if (!objective?.keyResults[0]) {
        throw objectiveError.keyResultNotFound;
      }
      res.locals.keyResult = objective?.keyResults[0];
      next();
    } catch (err) {
      next(err);
    }
  },

  async checkRequestData(req: Request, res: Response, next: NextFunction) {
    try {
      const data: KeyResultRequestData = req.body;
      const objective: ObjectiveDto = res.locals.objective;
      if (!data.name || !data.deadline) {
        throw commonError.requireFields;
      }
      if (!ValidationHelper.date(data.deadline)) {
        throw commonError.invalidDate;
      }
      // new Date(date).getTime()
      if (new Date(objective.deadline).getTime() < new Date(data.deadline).getTime()) {
        throw objectiveError.inValidKrDeadline;
      }
      next();
    } catch (err) {
      next(err);
    }
  }
};

export default keyResultMiddleware;
