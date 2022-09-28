import { NextFunction, Request, Response } from 'express';
import objectiveError from 'src/helpers/objective-error';
import ValidationHelper from 'src/helpers/validation';
import Objective from 'src/models/objective.model';

const commitMiddleware = {
  async checkKeyResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { objectiveId, krId } = req.params;
      const objective = await Objective.findOne({ _id: objectiveId }).lean();
      if (!objective) {
        next(objectiveError.objectiveNotFound);
      }
      const keyResult = objective?.keyResults.find(kr => kr._id == krId);
      if (!keyResult) {
        next(objectiveError.keyResultNotFound);
      }

      res.locals.objective = objective;
      res.locals.keyResult = keyResult;
      next();
    } catch (err) {
      next(err);
    }
  },
  async checkCommitData(req: Request, res: Response, next: NextFunction) {
    const { message, progress } = req.body;
    if (!message) {
      next(objectiveError.commitMessageIsRequired);
    }
    if (!ValidationHelper.isNumeric(progress) && progress < 0 && progress > 100) {
      next(objectiveError.progressIsInvalid);
    }
    next();
  },

  async checkCommitId(req: Request, res: Response, next: NextFunction) {
    try {
      const { objectiveId, krId, commitId } = req.params;
      const objective = await Objective.findOne({ _id: objectiveId });
      if (!objective) {
        next(objectiveError.objectiveNotFound);
      }
      const keyResult = objective?.keyResults.find(kr => kr._id == krId);
      if (!keyResult) {
        next(objectiveError.keyResultNotFound);
      }
      const commit = keyResult?.commits.find(cm => cm._id == commitId);
      if (!commit) {
        next(objectiveError.commitNotFound);
      }

      res.locals.objective = objective;
      res.locals.keyResult = keyResult;
      res.locals.commit = commit;
    } catch (err) {
      next(err);
    }
  }
};

export default commitMiddleware;
