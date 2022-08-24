import { NextFunction, Request, Response } from "express";
import prisma from "src/config/prisma.config";
import { StatusCodes } from "src/types/status-code.enum";
import { UserSignUpData } from "src/types/user.type";

const authMiddleware = {
  async checkSignUp(req: Request, res: Response, next: NextFunction) {
    const requestData: UserSignUpData = req.body;
    if (
      !requestData.firstName ||
      !requestData.lastName ||
      !requestData.email ||
      !requestData.password
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Fill in required entry fields!",
      });
    }

    const foundUserByEmail = await prisma.user.findFirst({
      where: {
        email: requestData.email,
      },
    });

    if (foundUserByEmail) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Email is already in use.",
      });
    }

    next();
  },
};

export default authMiddleware;
