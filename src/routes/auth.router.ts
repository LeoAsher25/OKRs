import { Router } from "express";
import authController from "src/controllers/auth.controller";
import authMiddleware from "src/middleware/auth.middleware";
import authMiddleware from "src/middleware/auth.middleware";

const authRouter = Router();

authRouter
  .post("/sign-up", authMiddleware.checkSignUp, authController.handleSignUp)
  .post("/login", authMiddleware.checkLogin, authController.handleLogin);

export default authRouter;
