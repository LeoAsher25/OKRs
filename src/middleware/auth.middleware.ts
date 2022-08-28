import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import userError from "src/helpers/user-error";
import REGEX from "src/helpers/validation";
import Session from "src/models/Session.model";
import User from "src/models/User.model";
import { UserSignUpData } from "src/types/user.type";

const authMiddleware = {
  async checkSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData: UserSignUpData = req.body;

      if (
        !requestData.firstName ||
        !requestData.lastName ||
        !requestData.email ||
        !requestData.password
      ) {
        throw userError.requireFields;
      }

      if (!REGEX.email.test(requestData.email)) {
        throw userError.emailIsInvalid;
      }

      // if (!REGEX.password.test(requestData.password)) {
      //   throw userError.emailPasswordIsIncorrect;
      // }

      const foundUserByEmail = await User.findOne({
        email: requestData.email,
      });

      if (foundUserByEmail) {
        throw userError.emailIsInUse;
      }
      next();
    } catch (err) {
      next(err);
    }
  },

  async checkLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = req.body;
      if (!REGEX.email.test(requestData.email)) {
        throw userError.emailIsInvalid;
      }
      // if (!REGEX.password.test(requestData.password)) {
      //   throw userError.emailPasswordIsIncorrect;
      // }
      const user = await User.findOne({
        email: requestData.email,
      });

      if (!user) {
        throw userError.emailPasswordIsIncorrect;
      }

      const isCorrect = await bcrypt.compare(
        requestData?.password,
        user?.password!
      );

      if (!isCorrect) {
        throw userError.emailPasswordIsIncorrect;
      }

      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },
  async checkRefeshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw userError.noToken;
    }

    const foundToken = await Session.find({
      token: refreshToken,
    });
    // prisma.userToken.findFirst({
    //   where: { token: refreshToken },
    // });
    if (!foundToken) {
      throw userError.invalidToken;
    }
    res.locals.refreshToken = refreshToken;
    next();
  },
};

export default authMiddleware;
