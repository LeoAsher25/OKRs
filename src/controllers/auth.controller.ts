import { NextFunction, Request, Response } from "express";
import authServices from "src/services/auth.service";
import { StatusCodes } from "src/types/status-code.enum";
import { UserSignUpData } from "src/types/user.type";

const authController = {
  async handleSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData: UserSignUpData = req.body;
      const newUser = await authServices.signUp(requestData);
      return res.status(StatusCodes.OK).json({
        message: "Sign up successfully",
        user: newUser,
      });
    } catch (err) {
      // const error = err as any;
      throw err;
    }
  },

  async handleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user;
      const response = await authServices.login(user);
      return res.status(200).json(response);
    } catch (err) {
      throw err;
    }
  },
};
export default authController;
