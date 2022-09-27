import ValidationHelper from 'src/helpers/validation';
import { NextFunction, Request, Response } from 'express';
import commonError from 'src/helpers/common-error';
import { KeyResultRequestData } from 'src/types/objective.type';
import Objective from 'src/models/objective.model';
import objectiveError from 'src/helpers/objective-error';
import mongoose from 'mongoose';

const keyResultMiddleware = {
  async checkGetOneKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { objectiveId, krId } = req.params;
      if (!ValidationHelper.objectId(krId)) {
        throw commonError.invalidObjectId;
      }
      const objective = await Objective.findOne({ _id: objectiveId }).lean();
      const keyResult = objective?.keyResults.find(kr => kr._id == krId);

      // const keyResult = await Objective.aggregate([
      //   {
      //     $match: {
      //       _id: new mongoose.Types.ObjectId(objectiveId)
      //       // 'keyResults._id': new mongoose.Types.ObjectId(krId)
      //     }
      //   },
      //   // {
      //   //   $project: {
      //   //     keyResults: 1
      //   //   }
      //   // },
      //   {
      //     $addFields: {
      //       keyResult: '$keyResults'
      //       // $match: {
      //       //   '$keyResults._id': new mongoose.Types.ObjectId(krId)
      //       // }
      //     }
      //   }
      // ]);

      if (!keyResult) {
        throw objectiveError.keyResultNotFound;
      }
      res.locals.keyResult = keyResult;
      next();
    } catch (err) {
      next(err);
    }
  },

  async checkRequestData(req: Request, res: Response, next: NextFunction) {
    try {
      const data: KeyResultRequestData = req.body;
      if (!data.name || !data.deadline) {
        throw commonError.requireFields;
      }
      if (!ValidationHelper.date(data.deadline)) {
        throw commonError.invalidDate;
      }

      next();
    } catch (err) {
      next(err);
    }
  }
};

export default keyResultMiddleware;
