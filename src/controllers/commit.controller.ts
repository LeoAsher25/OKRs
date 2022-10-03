import { NextFunction, Request, Response } from 'express';
import Objective from 'src/models/objective.model';
import { KeyResultDto, ObjectiveDto } from 'src/types/objective.type';
import { StatusCodes } from 'src/types/status-code.enum';

const commitController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { objective, keyResult } = res.locals as { objective: ObjectiveDto; keyResult: KeyResultDto };
      const requestData = req.body;
      requestData.progress = Number(requestData.progress);

      const newObjective = {
        ...objective,
        keyResults: objective.keyResults.map(kr => {
          return kr._id != keyResult._id
            ? kr
            : {
                ...kr,
                progress: Number(requestData.progress)
              };
        })
      };
      const numberKrDone = newObjective.keyResults.reduce(
        (currentCount, currentEle) => (currentCount += currentEle.progress === 100 ? 1 : 0),
        0
      );
      const newObjProgress = (numberKrDone * 100) / newObjective.keyResults.length;

      await Objective.findOneAndUpdate(
        {
          _id: objective._id
        },
        {
          ...newObjective,
          keyResults: newObjective.keyResults.map((kr: KeyResultDto) => {
            if (kr._id == keyResult._id) {
              kr.commits = [...kr.commits, requestData];
            }
            return kr;
          }),
          progress: newObjProgress
        }
      );
      return res.status(StatusCodes.OK).json({
        message: 'Create commit successfully'
      });
    } catch (err) {
      next(err);
    }
  }
};

export default commitController;
