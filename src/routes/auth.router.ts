import { Router } from "express";
import authController from "src/controllers/auth.controller";
import authMiddleware from "src/middleware/auth.middleware";

const authRouter = Router();

authRouter
  .post("/sign-up", authMiddleware.checkSignUp, authController.register)
  .post("/login", authMiddleware.checkLogin, authController.login)
  .post(
    "/refresh-token",
    authMiddleware.checkRefeshToken,
    authController.getTokenByRefreshToken
  );

export default authRouter;
