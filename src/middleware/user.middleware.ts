import { NextFunction, Request } from "express";
import commonError from "src/helpers/common-error";
import userError from "src/helpers/user-error";
import ValidationHelper from "src/helpers/validation";
import { UserUpdateData } from "src/types/user.type";

const userMiddleware = {
  async checkEdit(req: Request, res: Response, next: NextFunction) {
    try {
      const data: UserUpdateData = req.body;
      if (!ValidationHelper.phoneNumber.test(data.phoneNumber)) {
        throw userError.invalidPhoneNumber;
      }
      if (!ValidationHelper.date(data.dob)) {
        throw commonError.invalidDate;
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};

export default userMiddleware;
