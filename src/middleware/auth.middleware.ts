import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import commonError from 'src/helpers/common-error';
import userError from 'src/helpers/user-error';
import ValidationHelper from 'src/helpers/validation';
import Session from 'src/models/session.model';
import User from 'src/models/user.model';
import { UserSignUpData } from 'src/types/user.type';

const authMiddleware = {
  async checkSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData: UserSignUpData = req.body;

      if (!requestData.firstName || !requestData.lastName || !requestData.email || !requestData.password) {
        throw commonError.requireFields;
      }

      if (!ValidationHelper.email.test(requestData.email)) {
        throw userError.emailIsInvalid;
      }

      const foundUserByEmail = await User.findOne({
        email: requestData.email
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
      if (!ValidationHelper.email.test(requestData.email)) {
        throw userError.emailIsInvalid;
      }
      // if (!ValidationHelper.password.test(requestData.password)) {
      //   throw userError.emailPasswordIsIncorrect;
      // }
      const user = await User.findOne({
        email: requestData.email
      });

      if (!user) {
        throw userError.emailIsIncorrect;
      }

      const isCorrect = await bcrypt.compare(requestData?.password, user?.password!);

      if (!isCorrect) {
        throw userError.passwordIsIncorrect;
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
      token: refreshToken
    });
    if (!foundToken) {
      throw userError.invalidToken;
    }
    res.locals.refreshToken = refreshToken;
    next();
  }
};

export default authMiddleware;
