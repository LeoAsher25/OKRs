import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import authServices from "src/services/auth.service";
import { StatusCodes } from "src/types/status-code.enum";

const authController = {
  async handleSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData: Prisma.UserCreateInput = req.body;
      const newUser = await authServices.signUp(requestData);
      console.log("requestData: ", requestData);
      return res.status(StatusCodes.OK).json({
        message: "Sign up successfully",
        user: newUser,
      });
    } catch (err) {
      const error = err as any;
      console.log("err: ", error.code);
      return res.status(StatusCodes.BAD_REQUEST).json(err);
    }
  },
};
export default authController;
