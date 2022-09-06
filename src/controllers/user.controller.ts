import { NextFunction, Request, Response } from "express";
import userService from "src/services/user.service";
import { StatusCodes } from "src/types/status-code.enum";
import { UserUpdateData } from "src/types/user.type";

const userController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    return res.status(StatusCodes.OK).json(user);
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserUpdateData = req.body;
      const _id = req.user?._id!;
      const newUser = await userService.updateProfile(user, _id);
      return res.status(StatusCodes.OK).json(newUser);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

export default userController;
