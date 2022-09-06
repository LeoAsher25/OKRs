import { NextFunction, Request, Response } from "express";
import objectiveService from "src/services/objective.service";
import { LoginSessionInfo, RequestWithUser } from "src/types/auth.type";
import { ObjectiveCreateData } from "src/types/objective.type";
import { StatusCodes } from "src/types/status-code.enum";

const objectiveController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as ObjectiveCreateData;
      const user = req.user!;
      const response = await objectiveService.create(data, user);
      return response;
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const response = await objectiveService.getAll(user);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await objectiveService.getOne(id);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      next(err);
    }
  },
};
export default objectiveController;
