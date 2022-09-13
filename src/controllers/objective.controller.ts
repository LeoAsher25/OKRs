import { NextFunction, Request, Response } from "express";
import objectiveService from "src/services/objective.service";
import { LoginSessionInfo, RequestWithUser } from "src/types/auth.type";
import { ObjectiveRequestData } from "src/types/objective.type";
import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";

const objectiveController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as ObjectiveRequestData;
      const user = req.user!;
      const response = await objectiveService.create(data, user);
      return res.status(StatusCodes.OK).json(response);
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
      const id = req.params.objectiveId;
      const response = await objectiveService.getOne(id);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.objectiveId;
      await objectiveService.delete(id);
      res.status(StatusCodes.OK).json({
        message: "Delete objective successfully!",
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.objectiveId;
      const data = req.body;
      const response = await objectiveService.update(data, id);
      res.status(StatusCodes.OK).json(response);
    } catch (err) {
      next(err);
    }
  },
};
export default objectiveController;
