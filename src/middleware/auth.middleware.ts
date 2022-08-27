import { NextFunction, Request, Response } from "express";
import userError from "src/helpers/user-error";
import REGEX from "src/helpers/validation";
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
      console.log("foundUserByEmail2: ");

      const foundUserByEmail = await User.findOne({
        email: requestData.email,
      });
      console.log("foundUserByEmail: ", foundUserByEmail);

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
    } catch (err) {
      next(err);
    }
  },
};

export default authMiddleware;
