import { NextFunction, Request, Response } from "express";
import commonError from "src/helpers/common-error";
import ValidationHelper from "src/helpers/validation";
import { ObjectiveCreateData } from "src/types/objective.type";

const objectiveMiddleware = {
  async checkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ObjectiveCreateData = req.body;
      if (!data.name || !data.type || !data.description || !data.deadline) {
        throw commonError.requireFields;
      }
      if (!ValidationHelper.date(data.deadline)) {
        throw commonError.invalidDate;
      }
      next();
    } catch (err) {
      next(err);
    }
  },
};
export default objectiveMiddleware;
