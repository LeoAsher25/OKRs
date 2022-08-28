import { NextFunction, Request, Response } from "express";
import authServices from "src/services/auth.service";
import { TokenResponse } from "src/types/auth.type";
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
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      throw err;
    }
  },

  async handleRefreshToken(req: Request, res: Response) {
    try {
      const refreshToken = res.locals.refreshToken;

      let tokenResponse: TokenResponse = await authServices.refreshToken(
        refreshToken
      );

      return res.status(StatusCodes.OK).json(tokenResponse);
    } catch (err) {
      throw err;
    }
  },
};
export default authController;
